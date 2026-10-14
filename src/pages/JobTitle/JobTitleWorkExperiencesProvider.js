import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
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
import useKeepPreviousBox from 'hooks/useKeepPreviousBox';
import usePermission from 'hooks/usePermission';
import { jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

const useWorkExperiencesBoxSelector = (pageName, query) => {
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
  const rawBox = useKeepPreviousBox(useSelector(selector), pageName);
  return useCallback(
    state => {
      if (rawBox.data) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        return {
          ...rawBox,
          data: {
            ...rawBox.data,
            workExperiences: rawBox.data.workExperiences.map(
              e => experienceBoxSelectorAtId(e.id)(state).data || e,
            ),
          },
        };
      }
      return rawBox;
    },
    [rawBox],
  );
};

const JobTitleWorkExperiencesProvider = () => {
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

JobTitleWorkExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
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
