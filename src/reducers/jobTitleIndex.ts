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
  JobTitleInterviewExperience,
  JobTitleSalaryWorkTimeStatistics,
  JobTitleWorkExperience,
  SalaryDistributionBin,
} from 'graphql/jobTitle';
import { OvertimeFrequencyCount } from 'graphql/salaryWorkTime';
import { InterviewExperience, WorkExperience } from 'graphql/overview';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';

export type JobTitleOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperience[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperience[];
  workExperiencesCount: number;
};

export type JobTitleSalaryWorkTimeResult = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
};

export type JobTitleInterviewExperienceResult = {
  name: string;
  interviewExperiences: JobTitleInterviewExperience[];
  interviewExperiencesCount: number;
};

export type JobTitleWorkExperienceResult = {
  name: string;
  workExperiences: JobTitleWorkExperience[];
  workExperiencesCount: number;
};

const preloadedState: {
  indexesByPage: Record<number, FetchBox<JobTitle[]>>;
  indexCountBox: FetchBox<number>;
  overviewByName: Record<string, FetchBox<JobTitleOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<{
      salaryDistribution: SalaryDistributionBin[];
      averageWeekWorkTime: number;
      overtimeFrequencyCount: OvertimeFrequencyCount | number;
    } | null>
  >;
  timeAndSalaryByName: Record<
    string,
    FetchBox<
      | JobTitleSalaryWorkTimeResult & {
          companyName?: string | null;
          start: number;
          limit: number;
        }
      | null
    >
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<JobTitleSalaryWorkTimeStatistics | null>
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<
      | (JobTitleInterviewExperienceResult & {
          companyName: string | null | undefined;
          start: number;
          limit: number;
          sortBy: string;
        })
      | null
    >
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<
      | (JobTitleWorkExperienceResult & {
          companyName: string | null | undefined;
          start: number;
          limit: number;
          sortBy: string;
        })
      | null
    >
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
      box: FetchBox<{
        salaryDistribution: SalaryDistributionBin[];
        averageWeekWorkTime: number;
        overtimeFrequencyCount: OvertimeFrequencyCount | number;
      } | null>;
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
      box: FetchBox<
        | JobTitleSalaryWorkTimeResult & {
            companyName?: string | null;
            start: number;
            limit: number;
          }
        | null
      >;
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
      box: FetchBox<
        | (JobTitleInterviewExperienceResult & {
            companyName: string | null | undefined;
            start: number;
            limit: number;
            sortBy: string;
          })
        | null
      >;
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
      box: FetchBox<
        | (JobTitleWorkExperienceResult & {
            companyName: string | null | undefined;
            start: number;
            limit: number;
            sortBy: string;
          })
        | null
      >;
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
