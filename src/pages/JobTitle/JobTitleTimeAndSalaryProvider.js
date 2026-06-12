import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryJobTitleOverviewStatistics,
  queryJobTitleSalaryWorkTime,
  queryJobTitleSalaryWorkTimeStatistics,
} from 'actions/jobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/Searchbar';
import SalaryWorkTime from 'components/CompanyAndJobTitle/TimeAndSalary';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import usePermission from 'hooks/usePermission';
import {
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
  jobTitleTimeAndSalaryBoxSelectorByName,
  jobTitleTimeAndSalaryStatisticsBoxSelectorByName,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
} from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useJobTitle, { jobTitleSelector } from './useJobTitle';

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => overviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeStatistics = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = jobTitleTimeAndSalaryStatisticsBoxSelectorByName(
        pageName,
      )(state);
      return salaryWorkTimeStatisticsSelector(jobTitle);
    },
    [pageName],
  );

  return useSelector(selector);
};

const useSalaryWorkTimeBoxSelector = pageName => {
  return useCallback(
    state => {
      const jobTitle = jobTitleTimeAndSalaryBoxSelectorByName(pageName)(state);
      return jobTitle;
    },
    [pageName],
  );
};

const JobTitleSalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  const handleQueryJobTitleSalaryWorkTime = useCallback(
    ({ force = false } = {}) => {
      dispatch(
        queryJobTitleSalaryWorkTime(
          {
            jobTitle,
            companyName: companyName || undefined,
            start,
            limit,
          },
          { force },
        ),
      );
    },
    [dispatch, companyName, jobTitle, start, limit],
  );

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  useEffect(() => {
    dispatch(
      queryJobTitleSalaryWorkTimeStatistics({
        jobTitle,
      }),
    );
  }, [dispatch, jobTitle]);

  useEffect(() => {
    handleQueryJobTitleSalaryWorkTime();
  }, [handleQueryJobTitleSalaryWorkTime]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useSalaryWorkTimeBoxSelector(jobTitle);

  const statisticsBox = useOverviewStatisticsBox(jobTitle);
  const salaryWorkTimeStatistics = useSalaryWorkTimeStatistics(jobTitle);

  return (
    <SalaryWorkTime
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      tabType={TabType.TIME_AND_SALARY}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryJobTitleSalaryWorkTime({ force: true })}
    />
  );
};

JobTitleSalaryWorkTimeProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
    dispatch(
      queryJobTitleSalaryWorkTime({
        jobTitle,
        companyName,
        start,
        limit,
      }),
    ),
  ]);
};

export default JobTitleSalaryWorkTimeProvider;
