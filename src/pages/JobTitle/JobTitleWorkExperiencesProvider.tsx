import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
import { ExperienceType, WorkExperience } from 'apis/experience';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/SearchBar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import WorkExperiences from 'components/CompanyAndJobTitle/WorkExperiences';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import usePermission from 'hooks/usePermission';
import usePreviousBox from 'hooks/usePreviousBox';
import { RootState } from 'reducers';
import { JobTitleWorkExperienceResult } from 'reducers/jobTitleIndex';
import {
  JobTitleExperiencesQuery,
  jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox from 'utils/fetchBox';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

const useWorkExperiencesBoxSelector = (
  pageName: string,
  query: JobTitleExperiencesQuery,
): ((state: RootState) => FetchBox<JobTitleWorkExperienceResult | null>) => {
  const { companyName, start, limit, sortBy } = query;
  const selector = useMemo(
    () =>
      workExperiencesBoxSelectorByName(pageName, {
        companyName,
        start,
        limit,
        sortBy,
      }),
    [pageName, companyName, start, limit, sortBy],
  );
  // 換查詢參數時，新 key 的 box 還沒資料，先沿用同頁上一次的資料避免閃 Loader
  const rawBox = usePreviousBox(useSelector(selector), pageName);
  return useCallback(
    (state: RootState): FetchBox<JobTitleWorkExperienceResult | null> => {
      if (rawBox.data) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        return {
          ...rawBox,
          data: {
            ...rawBox.data,
            workExperiences: rawBox.data.workExperiences.map(
              (e: WorkExperience) => {
                const cached = experienceBoxSelectorAtId(e.id)(state).data;
                // experienceById is keyed across all experience types, so narrow
                // back to WorkExperience before using the cached copy.
                return cached && cached.type === ExperienceType.WORK
                  ? cached
                  : e;
              },
            ),
          },
        };
      }
      return rawBox;
    },
    [rawBox],
  );
};

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

const JobTitleWorkExperiencesProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitleParam();
  const [companyName] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleWorkExperiences({
        jobTitle,
        companyName: companyName || undefined,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useWorkExperiencesBoxSelector(jobTitle, {
    companyName: companyName || undefined,
    start,
    limit,
    sortBy,
  });

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.WORK_EXPERIENCE}
    >
      <WorkExperiences
        page={page}
        pageSize={PAGE_SIZE}
        boxSelector={boxSelector}
      />
    </CompanyAndJobTitleWrapper>
  );
};

JobTitleWorkExperiencesProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const companyName = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    }),
  );
};

export default JobTitleWorkExperiencesProvider;
