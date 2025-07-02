import R from 'ramda';
import FetchBox, { getUnfetched, isFetched } from 'utils/fetchBox';
import { RootState } from 'reducers';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import {
  RatingStatistics,
  CompanySalaryWorkTimeStatistics,
} from 'graphql/company';
import { JobTitleSalaryWorkTimeStatistics } from 'graphql/jobTitle';
import { SalaryWorkTimeStatistics } from 'graphql/salaryWorkTime';

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
) => {
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
): FetchBox<CompanyOverview> => {
  return state.companyIndex.overviewByName[companyName] || getUnfetched();
};

export const companyOverviewStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState) => {
  return (
    state.companyIndex.overviewStatisticsByName[companyName] || getUnfetched()
  );
};

export const companyTimeAndSalaryBoxSelectorByName = (companyName: string) => (
  state: RootState,
) => {
  return state.companyIndex.timeAndSalaryByName[companyName] || getUnfetched();
};

export const companyTimeAndSalaryStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanySalaryWorkTimeStatistics | null> => {
  return (
    state.companyIndex.timeAndSalaryStatisticsByName[companyName] ||
    getUnfetched()
  );
};

export const companyTopNJobTitlesBoxSelectorByName = (companyName: string) => (
  state: RootState,
) => {
  return state.companyIndex.topNJobTitlesByName[companyName] || getUnfetched();
};

export const companyEsgSalaryDataBoxSelectorByName = (companyName: string) => (
  state: RootState,
) => {
  return (
    R.path(['companyIndex', 'esgSalaryData', companyName])(state) ||
    getUnfetched()
  );
};

export const companyInterviewExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState) => {
  return (
    state.companyIndex.interviewExperiencesByName[companyName] || getUnfetched()
  );
};

export const companyWorkExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState) => {
  return (
    state.companyIndex.workExperiencesByName[companyName] || getUnfetched()
  );
};

export const jobTitleIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
) => {
  return state.jobTitleIndex.indexesByPage[page] || getUnfetched();
};

export const jobTitlesCountSelector = (state: RootState) => {
  const indexCountBox = state.jobTitleIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const jobTitleOverviewBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleOverview> => {
  return state.jobTitleIndex.overviewByName[jobTitle] || getUnfetched();
};

export const jobTitleOverviewStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState) => {
  return (
    state.jobTitleIndex.overviewStatisticsByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleTimeAndSalaryBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
) => {
  return state.jobTitleIndex.timeAndSalaryByName[jobTitle] || getUnfetched();
};

export const jobTitleTimeAndSalaryStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleSalaryWorkTimeStatistics | null> => {
  return (
    state.jobTitleIndex.timeAndSalaryStatisticsByName[jobTitle] ||
    getUnfetched()
  );
};

export const jobTitleInterviewExperiencesBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState) => {
  return (
    state.jobTitleIndex.interviewExperiencesByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleWorkExperiencesBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
) => {
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
