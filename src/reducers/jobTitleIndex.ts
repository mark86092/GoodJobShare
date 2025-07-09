import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
  SET_OVERVIEW_STATISTICS,
} from 'actions/jobTitle';
import {
  JobTitle,
  JobTitleExperiencesPaginationInput,
  JobTitleInterviewExperience,
  JobTitleSalaryWorkTimeStatistics,
  JobTitleWorkExperience,
} from 'graphql/jobTitle';
import {
  SalaryDistributionBin,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';

export type JobTitleOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
};

export type JobTitleOverviewStatistics = {
  salaryDistribution: SalaryDistributionBin[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

export type JobTitleSalaryWorkTimeResult = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  // params
  companyName?: string | null;
  start: number;
  limit: number;
};

export type JobTitleInterviewExperienceResult = {
  name: string;
  interviewExperiences: JobTitleInterviewExperience[];
  interviewExperiencesCount: number;
} & Omit<JobTitleExperiencesPaginationInput, 'jobTitle'>;

export type JobTitleWorkExperienceResult = {
  name: string;
  workExperiences: JobTitleWorkExperience[];
  workExperiencesCount: number;
} & Omit<JobTitleExperiencesPaginationInput, 'jobTitle'>;

const preloadedState: {
  indexesByPage: Record<number, FetchBox<JobTitle[]>>;
  indexCountBox: FetchBox<number>;
  overviewByName: Record<string, FetchBox<JobTitleOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<JobTitleOverviewStatistics | null>
  >;
  timeAndSalaryByName: Record<
    string,
    FetchBox<JobTitleSalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<JobTitleSalaryWorkTimeStatistics | null>
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<JobTitleInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<JobTitleWorkExperienceResult | null>
  >;
} = {
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }: { box: FetchBox<number> }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (
    state,
    { page, box }: { page: number; box: FetchBox<JobTitle[]> },
  ) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_OVERVIEW]: (
    state,
    {
      jobTitle,
      box,
    }: { jobTitle: string; box: FetchBox<JobTitleOverview | null> },
  ) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_OVERVIEW_STATISTICS]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleOverviewStatistics | null>;
    },
  ) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleSalaryWorkTimeResult | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY_STATISTICS]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleSalaryWorkTimeStatistics | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleInterviewExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleWorkExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [jobTitle]: box,
      },
    };
  },
});

export default reducer;
