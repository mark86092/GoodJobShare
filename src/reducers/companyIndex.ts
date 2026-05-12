import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_OVERVIEW_STATISTICS,
<<<<<<< HEAD
  SET_SALARY_WORK_TIME,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_SALARY_WORK_TIME_STATISTICS,
=======
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
>>>>>>> upstream/master
  SET_RATING_STATISTICS,
  SET_COMPANY_TOP_N_JOB_TITLES,
  SET_COMPANY_ESG_SALARY_DATA,
  SET_IS_SUBSCRIBED,
} from 'actions/company';
<<<<<<< HEAD
import { CompanyExperiencesPaginationInput } from 'apis/company';
=======
>>>>>>> upstream/master
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
<<<<<<< HEAD
import { CompanyInIndex } from 'apis/queryCompanies';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { CompanyInterviewExperience } from 'apis/queryCompanyInterviewExperiences';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
import { CompanySalaryWorkTimeStatistics } from 'apis/queryCompanySalaryWorkTimeStatistics';
import { TopNJobTitles } from 'apis/queryCompanyTopNJobTitles';
import { CompanyWorkExperience } from 'apis/queryCompanyWorkExperiences';
=======
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
>>>>>>> upstream/master
import {
  JobAverageSalary,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

<<<<<<< HEAD
=======
// TODO: replace with proper CompanyInIndex type
export type CompanyInIndex = unknown;

// Flattened from QueryCompanyOverviewData, so a type is defined here
>>>>>>> upstream/master
export type CompanyOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
};

<<<<<<< HEAD
=======
// Flattened from QueryCompanyOverviewStatisticsData, so a type is defined here
>>>>>>> upstream/master
export type CompanyOverviewStatistics = {
  jobAverageSalaries: JobAverageSalary[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

<<<<<<< HEAD
export type CompanySalaryWorkTimeResult = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  // params
  jobTitle?: string | null;
  start: number;
  limit: number;
};

export type CompanyInterviewExperienceResult = {
  name: string;
  interviewExperiences: CompanyInterviewExperience[];
  interviewExperiencesCount: number;
} & Omit<CompanyExperiencesPaginationInput, 'companyName'>;

export type CompanyWorkExperienceResult = {
  name: string;
  workExperiences: CompanyWorkExperience[];
  workExperiencesCount: number;
} & Omit<CompanyExperiencesPaginationInput, 'companyName'>;
=======
// TODO: replace with proper CompanyTimeAndSalaryResult type
export type CompanyTimeAndSalaryResult = unknown;

// TODO: replace with proper CompanyTimeAndSalaryStatistics type
export type CompanyTimeAndSalaryStatistics = unknown;

// TODO: replace with proper CompanyInterviewExperienceResult type
export type CompanyInterviewExperienceResult = unknown;

// TODO: replace with proper CompanyWorkExperienceResult type
export type CompanyWorkExperienceResult = unknown;

// TODO: replace with proper CompanyIsSubscribed type
export type CompanyIsSubscribed = unknown;

// TODO: replace with proper TopNJobTitles type
export type TopNJobTitles = unknown;
>>>>>>> upstream/master

type State = {
  indexesByPage: Record<number, FetchBox<CompanyInIndex[]>>;
  indexCountBox: FetchBox<number>;
  ratingStatisticsByName: Record<string, FetchBox<RatingStatistics | null>>;
  overviewByName: Record<string, FetchBox<CompanyOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<CompanyOverviewStatistics | null>
  >;
  timeAndSalaryByName: Record<
    string,
<<<<<<< HEAD
    FetchBox<CompanySalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<CompanySalaryWorkTimeStatistics | null>
=======
    FetchBox<CompanyTimeAndSalaryResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<CompanyTimeAndSalaryStatistics | null>
>>>>>>> upstream/master
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<CompanyInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<CompanyWorkExperienceResult | null>
  >;
<<<<<<< HEAD
  isSubscribedByName: Record<
    string,
    FetchBox<{
      isSubscribed: boolean;
      companyId: string | null;
    }>
  >;
=======
  isSubscribedByName: Record<string, FetchBox<CompanyIsSubscribed | null>>;
>>>>>>> upstream/master
  topNJobTitlesByName: Record<string, FetchBox<TopNJobTitles | null>>;
  esgSalaryData: Record<string, FetchBox<ESGSalaryData | null>>;
};

const preloadedState: State = {
<<<<<<< HEAD
  indexesByPage: {},
  indexCountBox: getUnfetched(),
=======
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> box
>>>>>>> upstream/master
  ratingStatisticsByName: {},
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
  isSubscribedByName: {},
<<<<<<< HEAD
=======
  // companyName --> box
  // box.data: null | {all, interview, work, salary}
>>>>>>> upstream/master
  topNJobTitlesByName: {},
  esgSalaryData: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }: { box: FetchBox<number> }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (
    state,
<<<<<<< HEAD
    {
      page,
      box,
    }: {
      page: number;
      box: FetchBox<CompanyInIndex[]>;
    },
=======
    { page, box }: { page: number; box: FetchBox<CompanyInIndex[]> },
>>>>>>> upstream/master
  ) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_RATING_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<RatingStatistics | null> },
  ) => {
    return {
      ...state,
      ratingStatisticsByName: {
        ...state.ratingStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<CompanyOverview | null> },
  ) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<CompanyOverviewStatistics | null> },
  ) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [companyName]: box,
      },
    };
  },
<<<<<<< HEAD
  [SET_SALARY_WORK_TIME]: (
=======
  [SET_TIME_AND_SALARY]: (
>>>>>>> upstream/master
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
<<<<<<< HEAD
      box: FetchBox<CompanySalaryWorkTimeResult | null>;
=======
      box: FetchBox<CompanyTimeAndSalaryResult | null>;
>>>>>>> upstream/master
    },
  ) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [companyName]: box,
      },
    };
  },
<<<<<<< HEAD
  [SET_SALARY_WORK_TIME_STATISTICS]: (
=======
  [SET_TIME_AND_SALARY_STATISTICS]: (
>>>>>>> upstream/master
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
<<<<<<< HEAD
      box: FetchBox<CompanySalaryWorkTimeStatistics | null>;
=======
      box: FetchBox<CompanyTimeAndSalaryStatistics | null>;
>>>>>>> upstream/master
    },
  ) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanyInterviewExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanyWorkExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_TOP_N_JOB_TITLES]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<TopNJobTitles | null> },
  ) => {
    return {
      ...state,
      topNJobTitlesByName: {
        ...state.topNJobTitlesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_ESG_SALARY_DATA]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<ESGSalaryData | null> },
  ) => {
    return {
      ...state,
      esgSalaryData: {
        ...state.esgSalaryData,
        [companyName]: box,
      },
    };
  },
  [SET_IS_SUBSCRIBED]: (
    state,
    {
      companyName,
      box,
<<<<<<< HEAD
    }: {
      companyName: string;
      box: FetchBox<{
        isSubscribed: boolean;
        companyId: string | null;
      }>;
    },
=======
    }: { companyName: string; box: FetchBox<CompanyIsSubscribed | null> },
>>>>>>> upstream/master
  ) => {
    return {
      ...state,
      isSubscribedByName: {
        ...state.isSubscribedByName,
        [companyName]: box,
      },
    };
  },
});

export default reducer;
