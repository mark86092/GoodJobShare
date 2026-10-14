import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyInterviewExperiences,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import InterviewExperiences from 'components/CompanyAndJobTitle/InterviewExperiences';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/SearchBar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import useKeepPreviousBox from 'hooks/useKeepPreviousBox';
import usePermission from 'hooks/usePermission';
import { companyInterviewExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import { useTopNJobTitles } from './useTopNJobTitles';

const useInterviewExperiencesBoxSelector = (pageName, query) => {
  const { jobTitle, start, limit, sortBy } = query;
  const selector = useMemo(
    () =>
      companyInterviewExperiencesBoxSelectorByName(pageName, {
        jobTitle,
        start,
        limit,
        sortBy,
      }),
    [pageName, jobTitle, start, limit, sortBy],
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
            interviewExperiences: rawBox.data.interviewExperiences.map(
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

const CompanyInterviewExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyNameParam();
  const [jobTitle] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyTopNJobTitles({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyInterviewExperiences({
        companyName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const boxSelector = useInterviewExperiencesBoxSelector(companyName, {
    jobTitle: jobTitle || undefined,
    start,
    limit,
    sortBy,
  });

  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.INTERVIEW_EXPERIENCE}
    >
      <InterviewExperiences
        page={page}
        pageSize={PAGE_SIZE}
        topNJobTitles={topNJobTitles.interview}
        boxSelector={boxSelector}
      />
    </CompanyAndJobTitleWrapper>
  );
};

CompanyInterviewExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const jobTitle = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(
      queryCompanyInterviewExperiences({
        companyName,
        jobTitle,
        start,
        limit,
        sortBy,
      }),
    ),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    ),
  ]);
};

export default CompanyInterviewExperiencesProvider;
