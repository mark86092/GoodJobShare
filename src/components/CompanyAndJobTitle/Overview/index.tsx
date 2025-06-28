import React, { Fragment } from 'react';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import FetchBox from 'utils/fetchBox';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import { PageType, TabType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';

type OverviewProps = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  boxSelector: (
    state: RootState,
  ) => FetchBox<CompanyOverview> | FetchBox<JobTitleOverview>;
  statisticsBox: any;
  topNJobTitles: any;
  onCloseReport: any;
};

const Overview: React.FC<OverviewProps> = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  topNJobTitles,
  onCloseReport,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={data => {
        return (
          <Fragment>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              topNJobTitles={topNJobTitles}
            />
            <OverviewSection
              pageType={pageType}
              pageName={pageName}
              interviewExperiences={data.interviewExperiences}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiences={data.workExperiences}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimes={data.salaryWorkTimes}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              statisticsBox={statisticsBox}
              onCloseReport={onCloseReport}
            />
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

export default Overview;
