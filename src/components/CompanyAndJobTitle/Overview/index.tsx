<<<<<<< HEAD:src/components/CompanyAndJobTitle/Overview/index.tsx
import React, { Fragment } from 'react';
=======
import React from 'react';
import PropTypes from 'prop-types';
>>>>>>> upstream/master:src/components/CompanyAndJobTitle/Overview/index.js
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';
<<<<<<< HEAD:src/components/CompanyAndJobTitle/Overview/index.tsx
import FetchBox from 'utils/fetchBox';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import { PageType, TabType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
=======
import { fetchBoxPropType } from 'utils/fetchBox';
import { Wrapper } from 'common/base';
>>>>>>> upstream/master:src/components/CompanyAndJobTitle/Overview/index.js

type OverviewProps = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  boxSelector: (
    state: RootState,
  ) => FetchBox<CompanyOverview | null> | FetchBox<JobTitleOverview | null>;
  statisticsBox: any;
  topNJobTitles?: any;
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
<<<<<<< HEAD:src/components/CompanyAndJobTitle/Overview/index.tsx
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={(data): ReturnType<React.FC> => {
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
=======
    <Wrapper size="l">
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        boxSelector={boxSelector}
        render={data => {
          return (
            <>
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
            </>
          );
        }}
      />
    </Wrapper>
>>>>>>> upstream/master:src/components/CompanyAndJobTitle/Overview/index.js
  </CompanyAndJobTitleWrapper>
);

export default Overview;
