import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchBox from 'utils/fetchBox';
import { RootState } from 'reducers';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import { PageType, TabType } from 'constants/companyJobTitle';
import {
  queryJobTitleOverview,
  queryJobTitleOverviewStatistics,
} from 'actions/jobTitle';
import {
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import useJobTitle, { jobTitleSelector } from './useJobTitle';
import { ServerSideRender } from 'types/serverSideRender';

const useOverviewBoxSelector = (
  pageName: string,
): ((state: RootState) => FetchBox<JobTitleOverview | null>) => {
  return useMemo(() => overviewBoxSelectorByName(pageName), [pageName]);
};

const useOverviewStatisticsBox = (pageName: string) => {
  const selector = useMemo(
    () => overviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

type Params = { jobTitle: string };

const JobTitleOverviewProvider: React.FC & ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitle();

  const handleQueryJobTitleOverview = useCallback(
    ({ force = false } = {}) => {
      dispatch(queryJobTitleOverview(jobTitle, { force }));
    },
    [dispatch, jobTitle],
  );

  useEffect(() => {
    handleQueryJobTitleOverview();
  }, [handleQueryJobTitleOverview]);

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    // @ts-ignore
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(jobTitle);
  const statisticsBox = useOverviewStatisticsBox(jobTitle);

  return (
    <Overview
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.OVERVIEW}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryJobTitleOverview({ force: true })}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const jobTitle = jobTitleSelector(params);
  return Promise.all([
    dispatch(queryJobTitleOverview(jobTitle)),
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
  ]);
};

export default JobTitleOverviewProvider;
