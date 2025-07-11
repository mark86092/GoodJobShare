import R from 'ramda';
import FetchBox, { getUnfetched, isFetched } from 'utils/fetchBox';
import { RootState } from 'reducers';
import {
  CompanyInterviewExperienceResult,
  CompanyOverview,
  CompanyOverviewStatistics,
  CompanySalaryWorkTimeResult,
  CompanyWorkExperienceResult,
} from 'reducers/companyIndex';
import {
  JobTitleInterviewExperienceResult,
  JobTitleOverview,
  JobTitleOverviewStatistics,
  JobTitleSalaryWorkTimeResult,
  JobTitleWorkExperienceResult,
} from 'reducers/jobTitleIndex';
import { CompanyInIndex, TopNJobTitles } from 'graphql/company';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { JobTitle } from 'graphql/jobTitle';
import { CompanySalaryWorkTimeStatistics } from 'apis/queryCompanySalaryWorkTimeStatistics';
import { JobTitleSalaryWorkTimeStatistics } from 'apis/queryJobTitleSalaryWorkTimeStatistics';
import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';

const data = <
  T extends
    | CompanySalaryWorkTimeStatistics
    | JobTitleSalaryWorkTimeStatistics
    | null
>(
  state: FetchBox<T>,
): T | undefined => state.data;

export const salaryWorkTimeStatistics: (
  arg0:
    | FetchBox<CompanySalaryWorkTimeStatistics | null>
    | FetchBox<JobTitleSalaryWorkTimeStatistics | null>,
) => SalaryWorkTimeStatistics | {} = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
  R.defaultTo({}),
);

export const companyIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<CompanyInIndex[]> => {
  return state.companyIndex.indexesByPage[page] || getUnfetched();
};

export const companiesCountSelector = (state: RootState): number => {
  const indexCountBox = state.companyIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const companyRatingStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<RatingStatistics | null> => {
  return (
    state.companyIndex.ratingStatisticsByName[companyName] || getUnfetched()
  );
};

export const companyOverviewBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyOverview | null> => {
  return state.companyIndex.overviewByName[companyName] || getUnfetched();
};

export const companyOverviewStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyOverviewStatistics | null> => {
  return (
    state.companyIndex.overviewStatisticsByName[companyName] || getUnfetched()
  );
};

export const companySalaryWorkTimeBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanySalaryWorkTimeResult | null> => {
  return state.companyIndex.timeAndSalaryByName[companyName] || getUnfetched();
};

export const companySalaryWorkTimeStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanySalaryWorkTimeStatistics | null> => {
  return (
    state.companyIndex.timeAndSalaryStatisticsByName[companyName] ||
    getUnfetched()
  );
};

export const companyTopNJobTitlesBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<TopNJobTitles | null> => {
  return state.companyIndex.topNJobTitlesByName[companyName] || getUnfetched();
};

export const companyEsgSalaryDataBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<ESGSalaryData | null> => {
  return state.companyIndex.esgSalaryData[companyName] || getUnfetched();
};

export const companyInterviewExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyInterviewExperienceResult | null> => {
  return (
    state.companyIndex.interviewExperiencesByName[companyName] || getUnfetched()
  );
};

export const companyWorkExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyWorkExperienceResult | null> => {
  return (
    state.companyIndex.workExperiencesByName[companyName] || getUnfetched()
  );
};

export const jobTitleIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<JobTitle[]> => {
  return state.jobTitleIndex.indexesByPage[page] || getUnfetched();
};

export const jobTitlesCountSelector = (state: RootState): number => {
  const indexCountBox = state.jobTitleIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const jobTitleOverviewBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleOverview | null> => {
  return state.jobTitleIndex.overviewByName[jobTitle] || getUnfetched();
};

export const jobTitleOverviewStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleOverviewStatistics | null> => {
  return (
    state.jobTitleIndex.overviewStatisticsByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleSalaryWorkTimeBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleSalaryWorkTimeResult | null> => {
  return state.jobTitleIndex.timeAndSalaryByName[jobTitle] || getUnfetched();
};

export const jobTitleSalaryWorkTimeStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleSalaryWorkTimeStatistics | null> => {
  return (
    state.jobTitleIndex.timeAndSalaryStatisticsByName[jobTitle] ||
    getUnfetched()
  );
};

export const jobTitleInterviewExperiencesBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleInterviewExperienceResult | null> => {
  return (
    state.jobTitleIndex.interviewExperiencesByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleWorkExperiencesBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleWorkExperienceResult | null> => {
  return state.jobTitleIndex.workExperiencesByName[jobTitle] || getUnfetched();
};

export const companyIsSubscribedBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<{
  isSubscribed: boolean;
  companyId: string | null;
}> => {
  return state.companyIndex.isSubscribedByName[companyName] || getUnfetched();
};
