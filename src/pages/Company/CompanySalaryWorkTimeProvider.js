import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SalaryWorkTime from 'components/CompanyAndJobTitle/TimeAndSalary';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { TabType, PageType, PAGE_SIZE } from 'constants/companyJobTitle';
import {
  queryCompanyEsgSalaryData,
  queryCompanyOverviewStatistics,
  queryCompanySalaryWorkTime,
  queryCompanySalaryWorkTimeStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  companySalaryWorkTimeBoxSelectorByName,
  companySalaryWorkTimeStatisticsBoxSelectorByName,
  companyEsgSalaryDataBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';
import {
  queryFromQuerySelector,
  pageFromQuerySelector,
} from 'selectors/routing';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/Searchbar';

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeStatisticsBox = pageName => {
  const selector = useCallback(
    state => {
      const company = companySalaryWorkTimeStatisticsBoxSelectorByName(
        pageName,
      )(state);
      return salaryWorkTimeStatisticsSelector(company);
    },
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeBoxSelector = companyName => {
  return useCallback(
    state => {
      const company = companySalaryWorkTimeBoxSelectorByName(companyName)(
        state,
      );
      return company;
    },
    [companyName],
  );
};

const useEsgSalaryDataBox = companyName => {
  const selector = useCallback(
    companyEsgSalaryDataBoxSelectorByName(companyName),
    [companyName],
  );

  return useSelector(selector);
};

const CompanySalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  const handleQueryCompanySalaryWorkTime = useCallback(
    ({ force = false } = {}) => {
      dispatch(
        queryCompanySalaryWorkTime(
          {
            companyName,
            jobTitle: jobTitle || undefined,
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
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanySalaryWorkTimeStatistics({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyEsgSalaryData({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    handleQueryCompanySalaryWorkTime();
  }, [handleQueryCompanySalaryWorkTime]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const statisticsBox = useOverviewStatisticsBox(companyName);
  const salaryWorkTimeStatistics = useSalaryWorkTimeStatisticsBox(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);
  const esgSalaryDataBox = useEsgSalaryDataBox(companyName);

  const boxSelector = useSalaryWorkTimeBoxSelector(companyName);

  return (
    <SalaryWorkTime
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      topNJobTitles={topNJobTitles.salary}
      esgSalaryDataBox={esgSalaryDataBox}
      tabType={TabType.TIME_AND_SALARY}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryCompanySalaryWorkTime({ force: true })}
    />
  );
};

CompanySalaryWorkTimeProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  return Promise.all([
    dispatch(queryCompanyOverviewStatistics(companyName)),
    dispatch(
      queryCompanySalaryWorkTime({
        companyName,
        jobTitle,
        start,
        limit,
      }),
    ),
    dispatch(
      queryCompanySalaryWorkTimeStatistics({
        companyName,
      }),
    ),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    ),
    dispatch(
      queryCompanyEsgSalaryData({
        companyName,
      }),
    ),
  ]);
};

export default CompanySalaryWorkTimeProvider;
