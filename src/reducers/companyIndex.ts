import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_OVERVIEW_STATISTICS,
  SET_SALARY_WORK_TIME,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_SALARY_WORK_TIME_STATISTICS,
  SET_RATING_STATISTICS,
  SET_COMPANY_TOP_N_JOB_TITLES,
  SET_COMPANY_ESG_SALARY_DATA,
  SET_IS_SUBSCRIBED,
} from 'actions/company';
import { CompanyExperiencesPaginationInput } from 'apis/company';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import { CompanyInIndex } from 'apis/queryCompanies';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { CompanyInterviewExperience } from 'apis/queryCompanyInterviewExperiences';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
import { CompanySalaryWorkTimeStatistics } from 'apis/queryCompanySalaryWorkTimeStatistics';
import { TopNJobTitles } from 'apis/queryCompanyTopNJobTitles';
import { CompanyWorkExperience } from 'apis/queryCompanyWorkExperiences';
import {
  JobAverageSalary,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

export type CompanyOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
};

export type CompanyOverviewStatistics = {
  jobAverageSalaries: JobAverageSalary[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

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
    FetchBox<CompanySalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<CompanySalaryWorkTimeStatistics | null>
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<CompanyInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<CompanyWorkExperienceResult | null>
  >;
  isSubscribedByName: Record<
    string,
    FetchBox<{
      isSubscribed: boolean;
      companyId: string | null;
    }>
  >;
  topNJobTitlesByName: Record<string, FetchBox<TopNJobTitles | null>>;
  esgSalaryData: Record<string, FetchBox<ESGSalaryData | null>>;
};

const preloadedState: State = {
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  ratingStatisticsByName: {},
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
  isSubscribedByName: {},
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
    {
      page,
      box,
    }: {
      page: number;
      box: FetchBox<CompanyInIndex[]>;
    },
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
    }: {
      companyName: string;
      box: FetchBox<CompanyOverviewStatistics | null>;
    },
  ) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_SALARY_WORK_TIME]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanySalaryWorkTimeResult | null>;
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
  [SET_SALARY_WORK_TIME_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanySalaryWorkTimeStatistics | null>;
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
    }: {
      companyName: string;
      box: FetchBox<{
        isSubscribed: boolean;
        companyId: string | null;
      }>;
    },
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
