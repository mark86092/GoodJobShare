import { CompanyInIndex } from 'apis/queryCompanies';
import { CompanyIsSubscribed } from 'apis/queryCompanyIsSubscribed';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
import { TopNJobTitles } from 'apis/queryCompanyTopNJobTitles';
import { JobTitleInIndex } from 'apis/queryJobTitles';
import {
  DataTimeRange,
  ExperienceInYearRange,
  OvertimeStats,
} from 'apis/salaryWorkTime';
import { Aspect } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import {
  AspectStatisticsDataInIndex,
  CompanyAspectExperienceResult,
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
import { EsgYearStatistics } from 'utils/esgYearUtils';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import toQueryKey from 'utils/queryKey';

export type CompanyExperiencesQuery = {
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
};

export type CompanyAspectExperiencesQuery = {
  aspect: Aspect;
  rating: number | null;
  start: number;
  limit: number;
};

export type JobTitleExperiencesQuery = {
  companyName?: string;
  start: number;
  limit: number;
  sortBy?: string;
};

export const getCompanyExperiencesQueryKey = (
  query: CompanyExperiencesQuery,
): string => toQueryKey({ ...query });

export const getCompanyAspectExperiencesQueryKey = (
  query: CompanyAspectExperiencesQuery,
): string => toQueryKey({ ...query });

export const getJobTitleExperiencesQueryKey = (
  query: JobTitleExperiencesQuery,
): string => toQueryKey({ ...query });

export const companyIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<CompanyInIndex[]> =>
  state.companyIndex.indexesByPage[page] || getUnfetched();

export const companiesCountSelector = (state: RootState): number => {
  // 換頁重抓時 box 為 FETCHING 但仍保有上次的 data，總數沿用以免分頁列縮成 0
  const { data } = state.companyIndex.indexCountBox;
  return data === undefined ? 0 : data;
};

export const companyRatingStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<RatingStatistics | null> =>
  state.companyIndex.ratingStatisticsByName[companyName] || getUnfetched();

export const companyOverviewBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyOverview | null> =>
  state.companyIndex.overviewByName[companyName] || getUnfetched();

export const companyOverviewStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyOverviewStatistics | null> =>
  state.companyIndex.overviewStatisticsByName[companyName] || getUnfetched();

export type CompanySalaryWorkTimeQuery = {
  jobTitle?: string;
  start: number;
  limit: number;
  dataTimeRange?: DataTimeRange;
  experienceInYearRange?: ExperienceInYearRange;
  gender?: string;
  sortBy?: string;
};

// 每組查詢參數各自一個 box，不同參數的請求互不覆蓋、互不跳過
export const getCompanySalaryWorkTimeQueryKey = ({
  jobTitle,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}: CompanySalaryWorkTimeQuery): string =>
  toQueryKey({
    jobTitle,
    start,
    limit,
    dataTimeRange,
    experienceInYearRange,
    gender,
    sortBy,
  });

export const companySalaryWorkTimeBoxSelectorByName = (
  companyName: string,
  query: CompanySalaryWorkTimeQuery,
) => (state: RootState): FetchBox<CompanySalaryWorkTimeResult | null> =>
  (state.companyIndex.timeAndSalaryByName[companyName] || {})[
    getCompanySalaryWorkTimeQueryKey(query)
  ] || getUnfetched();

export const companySalaryWorkTimeStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<OvertimeStats | null> =>
  state.companyIndex.timeAndSalaryStatisticsByName[companyName] ||
  getUnfetched();

export const companyTopNJobTitlesBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<TopNJobTitles | null> =>
  state.companyIndex.topNJobTitlesByName[companyName] || getUnfetched();

export const companyEsgSalaryDataBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<EsgYearStatistics[] | null> =>
  state.companyIndex.esgSalaryData[companyName] || getUnfetched();

export const companyInterviewExperiencesBoxSelectorByName = (
  companyName: string,
  query: CompanyExperiencesQuery,
) => (state: RootState): FetchBox<CompanyInterviewExperienceResult | null> =>
  (state.companyIndex.interviewExperiencesByName[companyName] || {})[
    getCompanyExperiencesQueryKey(query)
  ] || getUnfetched();

export const companyWorkExperiencesBoxSelectorByName = (
  companyName: string,
  query: CompanyExperiencesQuery,
) => (state: RootState): FetchBox<CompanyWorkExperienceResult | null> =>
  (state.companyIndex.workExperiencesByName[companyName] || {})[
    getCompanyExperiencesQueryKey(query)
  ] || getUnfetched();

export const companyWorkExperiencesAspectStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<AspectStatisticsDataInIndex | null> =>
  state.companyIndex.workExperiencesAspectStatisticsByName[companyName] ||
  getUnfetched();

export const companyWorkExperiencesAspectExperiencesBoxSelectorByName = (
  companyName: string,
  query: CompanyAspectExperiencesQuery,
) => (state: RootState): FetchBox<CompanyAspectExperienceResult | null> =>
  (state.companyIndex.workExperiencesAspectExperiencesByName[companyName] ||
    {})[getCompanyAspectExperiencesQueryKey(query)] || getUnfetched();

export const companyIsSubscribedBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyIsSubscribed> =>
  state.companyIndex.isSubscribedByName[companyName] || getUnfetched();

export const jobTitleIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<JobTitleInIndex[]> =>
  state.jobTitleIndex.indexesByPage[page] || getUnfetched();

export const jobTitlesCountSelector = (state: RootState): number => {
  // 換頁重抓時 box 為 FETCHING 但仍保有上次的 data，總數沿用以免分頁列縮成 0
  const { data } = state.jobTitleIndex.indexCountBox;
  return data === undefined ? 0 : data;
};

export const jobTitleOverviewBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleOverview | null> =>
  state.jobTitleIndex.overviewByName[jobTitle] || getUnfetched();

export const jobTitleOverviewStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleOverviewStatistics | null> =>
  state.jobTitleIndex.overviewStatisticsByName[jobTitle] || getUnfetched();

export type JobTitleSalaryWorkTimeQuery = {
  companyName?: string;
  start: number;
  limit: number;
  dataTimeRange?: DataTimeRange;
  experienceInYearRange?: ExperienceInYearRange;
  gender?: string;
  sortBy?: string;
};

export const getJobTitleSalaryWorkTimeQueryKey = ({
  companyName,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}: JobTitleSalaryWorkTimeQuery): string =>
  toQueryKey({
    companyName,
    start,
    limit,
    dataTimeRange,
    experienceInYearRange,
    gender,
    sortBy,
  });

export const jobTitleSalaryWorktimeBoxSelectorByName = (
  jobTitle: string,
  query: JobTitleSalaryWorkTimeQuery,
) => (state: RootState): FetchBox<JobTitleSalaryWorkTimeResult | null> =>
  (state.jobTitleIndex.timeAndSalaryByName[jobTitle] || {})[
    getJobTitleSalaryWorkTimeQueryKey(query)
  ] || getUnfetched();

export const jobTitleSalaryWorkTimeStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<OvertimeStats | null> =>
  state.jobTitleIndex.timeAndSalaryStatisticsByName[jobTitle] || getUnfetched();

export const jobTitleInterviewExperiencesBoxSelectorByName = (
  jobTitle: string,
  query: JobTitleExperiencesQuery,
) => (state: RootState): FetchBox<JobTitleInterviewExperienceResult | null> =>
  (state.jobTitleIndex.interviewExperiencesByName[jobTitle] || {})[
    getJobTitleExperiencesQueryKey(query)
  ] || getUnfetched();

export const jobTitleWorkExperiencesBoxSelectorByName = (
  jobTitle: string,
  query: JobTitleExperiencesQuery,
) => (state: RootState): FetchBox<JobTitleWorkExperienceResult | null> =>
  (state.jobTitleIndex.workExperiencesByName[jobTitle] || {})[
    getJobTitleExperiencesQueryKey(query)
  ] || getUnfetched();
