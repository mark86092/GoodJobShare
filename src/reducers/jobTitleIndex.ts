import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
<<<<<<< HEAD
  SET_SALARY_WORK_TIME,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_SALARY_WORK_TIME_STATISTICS,
  SET_OVERVIEW_STATISTICS,
} from 'actions/jobTitle';
import {
  JobTitle,
  JobTitleExperiencesPaginationInput,
  JobTitleInterviewExperience,
  JobTitleWorkExperience,
} from 'graphql/jobTitle';
import { JobTitleSalaryWorkTimeStatistics } from 'apis/queryJobTitleSalaryWorkTimeStatistics';
=======
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
  SET_OVERVIEW_STATISTICS,
} from 'actions/jobTitle';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
>>>>>>> upstream/master
import {
  SalaryDistributionBin,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
<<<<<<< HEAD
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';

=======

// TODO: replace with proper JobTitleInIndex type
export type JobTitleInIndex = unknown;

// Flattened from QueryJobTitleOverviewData, so a type is defined here
>>>>>>> upstream/master
export type JobTitleOverview = {
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
// Flattened from QueryJobTitleOverviewStatisticsData, so a type is defined here
>>>>>>> upstream/master
export type JobTitleOverviewStatistics = {
  salaryDistribution: SalaryDistributionBin[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

<<<<<<< HEAD
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
=======
// TODO: replace with proper JobTitleTimeAndSalaryResult type
export type JobTitleTimeAndSalaryResult = unknown;

// TODO: replace with proper JobTitleTimeAndSalaryStatistics type
export type JobTitleTimeAndSalaryStatistics = unknown;

// TODO: replace with proper JobTitleInterviewExperienceResult type
export type JobTitleInterviewExperienceResult = unknown;

// TODO: replace with proper JobTitleWorkExperienceResult type
export type JobTitleWorkExperienceResult = unknown;

type State = {
  indexesByPage: Record<number, FetchBox<JobTitleInIndex[]>>;
>>>>>>> upstream/master
  indexCountBox: FetchBox<number>;
  overviewByName: Record<string, FetchBox<JobTitleOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<JobTitleOverviewStatistics | null>
  >;
  timeAndSalaryByName: Record<
    string,
<<<<<<< HEAD
    FetchBox<JobTitleSalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<JobTitleSalaryWorkTimeStatistics | null>
=======
    FetchBox<JobTitleTimeAndSalaryResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<JobTitleTimeAndSalaryStatistics | null>
>>>>>>> upstream/master
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<JobTitleInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<JobTitleWorkExperienceResult | null>
  >;
<<<<<<< HEAD
} = {
  indexesByPage: {},
  indexCountBox: getUnfetched(),
=======
};

const preloadedState: State = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // jobTitle --> overviewBox
>>>>>>> upstream/master
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
<<<<<<< HEAD
    { page, box }: { page: number; box: FetchBox<JobTitle[]> },
=======
    { page, box }: { page: number; box: FetchBox<JobTitleInIndex[]> },
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
<<<<<<< HEAD
  [SET_SALARY_WORK_TIME]: (
=======
  [SET_TIME_AND_SALARY]: (
>>>>>>> upstream/master
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
<<<<<<< HEAD
      box: FetchBox<JobTitleSalaryWorkTimeResult | null>;
=======
      box: FetchBox<JobTitleTimeAndSalaryResult | null>;
>>>>>>> upstream/master
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
<<<<<<< HEAD
  [SET_SALARY_WORK_TIME_STATISTICS]: (
=======
  [SET_TIME_AND_SALARY_STATISTICS]: (
>>>>>>> upstream/master
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
<<<<<<< HEAD
      box: FetchBox<JobTitleSalaryWorkTimeStatistics | null>;
=======
      box: FetchBox<JobTitleTimeAndSalaryStatistics | null>;
>>>>>>> upstream/master
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
