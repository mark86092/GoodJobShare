import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchBox from 'utils/fetchBox';
import { RootState } from 'reducers';
import { CompanyOverview } from 'reducers/companyIndex';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import { PageType, TabType } from 'constants/companyJobTitle';
import {
  queryCompanyOverview,
  queryCompanyOverviewStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  companyOverviewBoxSelectorByName as overviewBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import useCompanyName, { Params, companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';

const useOverviewBoxSelector = (
  pageName: string,
): ((state: RootState) => FetchBox<CompanyOverview | null>) => {
  return useMemo(() => overviewBoxSelectorByName(pageName), [pageName]);
};

const useOverviewStatisticsBox = (pageName: string) => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const CompanyOverviewProvider: React.FC & ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyName();

  const handleQueryCompanyOverview = useCallback(
    ({ force = false } = {}) => {
      dispatch(queryCompanyOverview(companyName, { force }));
    },
    [dispatch, companyName],
  );

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    handleQueryCompanyOverview();
  }, [handleQueryCompanyOverview]);

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    // @ts-ignore
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(companyName);
  const statisticsBox = useOverviewStatisticsBox(companyName);

  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <Overview
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.OVERVIEW}
      topNJobTitles={topNJobTitles.all}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryCompanyOverview({ force: true })}
    />
  );
};

CompanyOverviewProvider.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyOverview(companyName)),
    dispatch(queryCompanyOverviewStatistics(companyName)),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(queryCompanyTopNJobTitles({ companyName })),
  ]);
};

export default CompanyOverviewProvider;
