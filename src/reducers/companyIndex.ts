import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_OVERVIEW_STATISTICS,
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
  SET_RATING_STATISTICS,
  SET_COMPANY_TOP_N_JOB_TITLES,
  SET_COMPANY_ESG_SALARY_DATA,
  SET_IS_SUBSCRIBED,
} from 'actions/company';
import { InterviewExperience, WorkExperience } from 'graphql/overview';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';

export type CompanyOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperience[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperience[];
  workExperiencesCount: number;
} | null;

const preloadedState: {
  indexesByPage: Record<number, FetchBox<any>>;
  indexCountBox: FetchBox<number>;
  ratingStatisticsByName: Record<string, FetchBox<any>>;
  overviewByName: Record<string, FetchBox<CompanyOverview>>;
  overviewStatisticsByName: Record<string, FetchBox<any>>;
  timeAndSalaryByName: Record<string, FetchBox<any>>;
  timeAndSalaryStatisticsByName: Record<string, FetchBox<any>>;
  interviewExperiencesByName: Record<string, FetchBox<any>>;
  workExperiencesByName: Record<string, FetchBox<any>>;
  isSubscribedByName: Record<string, FetchBox<any>>;
  topNJobTitlesByName: Record<string, FetchBox<any>>;
  esgSalaryData: Record<string, FetchBox<any>>;
} = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> box
  ratingStatisticsByName: {},
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
  isSubscribedByName: {},
  // companyName --> box
  // box.data: null | {all, interview, work, salary}
  topNJobTitlesByName: {},
  esgSalaryData: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (state, { page, box }) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_RATING_STATISTICS]: (state, { companyName, box }) => {
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
    }: { companyName: string; box: FetchBox<CompanyOverview> },
  ) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW_STATISTICS]: (state, { companyName, box }) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY]: (state, { companyName, box }) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [companyName]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY_STATISTICS]: (state, { companyName, box }) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (state, { companyName, box }) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (state, { companyName, box }) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_TOP_N_JOB_TITLES]: (state, { companyName, box }) => {
    return {
      ...state,
      topNJobTitlesByName: {
        ...state.topNJobTitlesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_ESG_SALARY_DATA]: (state, { companyName, box }) => {
    return {
      ...state,
      esgSalaryData: {
        ...state.esgSalaryData,
        [companyName]: box,
      },
    };
  },
  [SET_IS_SUBSCRIBED]: (state, { companyName, box }) => {
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
