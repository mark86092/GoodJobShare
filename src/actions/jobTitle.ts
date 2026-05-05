import { AnyAction } from 'redux';
import { Thunk } from 'reducers';
import {
  JobTitleOverview,
  JobTitleOverviewStatistics,
  JobTitleSalaryWorkTimeResult,
  JobTitleInterviewExperienceResult,
  JobTitleWorkExperienceResult,
} from 'reducers/jobTitleIndex';
import { isGraphqlError } from 'utils/errors';
import FetchBox, {
  isFetching,
  isFetched,
  toFetching,
  getFetched,
  getError,
} from 'utils/fetchBox';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitleOverviewBoxSelectorByName,
  jobTitleSalaryWorkTimeBoxSelectorByName,
  jobTitleSalaryWorkTimeStatisticsBoxSelectorByName,
  jobTitleInterviewExperiencesBoxSelectorByName,
  jobTitleWorkExperiencesBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  queryJobTitleSalaryWorkTime as queryJobTitleSalaryWorkTimeApi,
  getJobTitleInterviewExperiences,
  getJobTitleWorkExperiences,
  queryJobTitlesApi,
} from 'apis/jobTitle';
import { JobTitle, JobTitleExperiencesPaginationInput } from 'graphql/jobTitle';
import queryJobTitleOverviewApi from 'apis/queryJobTitleOverview';
import queryJobTitleOverviewStatisticsApi from 'apis/queryJobTitleOverviewStatistics';
import queryJobTitleSalaryWorkTimeStatisticsApi, {
  JobTitleSalaryWorkTimeStatistics,
} from 'apis/queryJobTitleSalaryWorkTimeStatistics';
import { setExperience } from './experience';

export const SET_OVERVIEW = '@@JOB_TITLE/SET_OVERVIEW';
export const SET_OVERVIEW_STATISTICS = '@@JOB_TITLE/SET_OVERVIEW_STATISTICS';
export const SET_SALARY_WORK_TIME = '@@JOB_TITLE/SET_SALARY_WORK_TIME';
export const SET_SALARY_WORK_TIME_STATISTICS =
  '@@JOB_TITLE/SET_SALARY_WORK_TIME_STATISTICS';
export const SET_INTERVIEW_EXPERIENCES =
  '@@JOB_TITLE/SET_INTERVIEW_EXPERIENCES';
export const SET_WORK_EXPERIENCES = '@@JOB_TITLE/SET_WORK_EXPERIENCES';
export const SET_INDEX = '@@JOB_TITLE/SET_INDEX';
export const SET_INDEX_COUNT = '@@JOB_TITLE/SET_INDEX_COUNT';

const setIndex = (page: number, box: FetchBox<JobTitle[]>): AnyAction => ({
  type: SET_INDEX,
  page,
  box,
});

const setIndexCount = (box: FetchBox<number>): AnyAction => ({
  type: SET_INDEX_COUNT,
  box,
});

export const fetchJobTitles = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = jobTitleIndexesBoxSelectorAtPage(page)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setIndex(page, toFetching()));
  dispatch(setIndexCount(toFetching()));

  try {
    const data = await queryJobTitlesApi({
      start: (page - 1) * pageSize,
      limit: pageSize,
    });
    dispatch(setIndex(page, getFetched(data.jobTitlesHavingData)));
    dispatch(setIndexCount(getFetched(data.jobTitlesHavingDataCount)));
  } catch (error) {
    // @ts-ignore
    if (isGraphqlError(error)) {
      return dispatch(setIndex(page, getError(error)));
    }
    throw error;
  }
};

const SALARY_WORK_TIMES_LIMIT = 5;
const WORK_EXPERIENCES_LIMIT = 3;
const INTERVIEW_EXPERIENCES_LIMIT = 3;

const setOverview = (
  jobTitle: string,
  box: FetchBox<JobTitleOverview | null>,
): AnyAction => ({
  type: SET_OVERVIEW,
  jobTitle,
  box,
});

export const queryJobTitleOverview = (
  jobTitle: string,
  { force = false }: { force?: boolean } = {},
): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = jobTitleOverviewBoxSelectorByName(jobTitle)(getState());
  if (!force && (isFetching(box) || isFetched(box))) {
    return;
  }

  dispatch(setOverview(jobTitle, toFetching()));

  try {
    const data = await queryJobTitleOverviewApi({
      jobTitle,
      interviewExperiencesLimit: INTERVIEW_EXPERIENCES_LIMIT,
      workExperiencesLimit: WORK_EXPERIENCES_LIMIT,
      salaryWorkTimesLimit: SALARY_WORK_TIMES_LIMIT,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverview(jobTitle, getFetched(data)));
    }

    const overviewData = {
      name: data.name,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setOverview(jobTitle, getFetched(overviewData)));
  } catch (error) {
    // @ts-ignore
    if (isGraphqlError(error)) {
      dispatch(setOverview(jobTitle, getError(error)));
    }
    throw error;
  }
};

const setOverviewStatistics = (
  jobTitle: string,
  box: FetchBox<JobTitleOverviewStatistics | null>,
): AnyAction => ({
  type: SET_OVERVIEW_STATISTICS,
  jobTitle,
  box,
});

export const queryJobTitleOverviewStatistics = (
  jobTitle: string,
): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = jobTitleOverviewStatisticsBoxSelectorByName(jobTitle)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setOverviewStatistics(jobTitle, toFetching()));

  try {
    const data = await queryJobTitleOverviewStatisticsApi({
      jobTitle,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverviewStatistics(jobTitle, getFetched(data)));
    }

    // TODO: don't process default value
    const model = {
      salaryDistribution: data.salary_distribution.bins || [],
      averageWeekWorkTime:
        data.salary_work_time_statistics.average_week_work_time || 0,
      overtimeFrequencyCount:
        data.salary_work_time_statistics.overtime_frequency_count || null,
    };

    dispatch(setOverviewStatistics(jobTitle, getFetched(model)));
  } catch (error) {
    // @ts-ignore
    if (isGraphqlError(error)) {
      dispatch(setOverviewStatistics(jobTitle, getError(error)));
    }
    throw error;
  }
};

const setSalaryWorkTime = (
  jobTitle: string,
  box: FetchBox<JobTitleSalaryWorkTimeResult | null>,
): AnyAction => ({
  type: SET_SALARY_WORK_TIME,
  jobTitle,
  box,
});

export const queryJobTitleSalaryWorkTime = (
  {
    jobTitle,
    companyName,
    start,
    limit,
  }: {
    jobTitle: string;
    companyName?: string | null;
    start: number;
    limit: number;
  },
  { force = false } = {},
): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = jobTitleSalaryWorkTimeBoxSelectorByName(jobTitle)(getState());
  if (
    !force &&
    (isFetching(box) ||
      (isFetched(box) &&
        box.data &&
        box.data.name === jobTitle &&
        box.data.companyName === companyName &&
        box.data.start === start &&
        box.data.limit === limit))
  ) {
    return;
  }

<<<<<<< HEAD:src/actions/jobTitle.ts
  dispatch(setSalaryWorkTime(jobTitle, toFetching()));
=======
  dispatch(setTimeAndSalary(jobTitle, toFetching(box)));
>>>>>>> upstream/master:src/actions/jobTitle.js

  try {
    const data = await queryJobTitleSalaryWorkTimeApi({
      jobTitle,
      companyName,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setSalaryWorkTime(jobTitle, getFetched(data)));
    }

    const salaryWorkTimeData = {
      name: data.name,
      companyName,
      start,
      limit,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
    };

    dispatch(setSalaryWorkTime(jobTitle, getFetched(salaryWorkTimeData)));
  } catch (error) {
    dispatch(setSalaryWorkTime(jobTitle, getError(error)));
  }
};

const setSalaryWorkTimeStatistics = (
  jobTitle: string,
  box: FetchBox<JobTitleSalaryWorkTimeStatistics | null>,
): AnyAction => ({
  type: SET_SALARY_WORK_TIME_STATISTICS,
  jobTitle,
  box,
});

export const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = jobTitleSalaryWorkTimeStatisticsBoxSelectorByName(jobTitle)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) && box.data && box.data.name === jobTitle)
  ) {
    return;
  }

<<<<<<< HEAD:src/actions/jobTitle.ts
  dispatch(setSalaryWorkTimeStatistics(jobTitle, toFetching()));
=======
  dispatch(setTimeAndSalaryStatistics(jobTitle, toFetching(box)));
>>>>>>> upstream/master:src/actions/jobTitle.js

  try {
    const data = await queryJobTitleSalaryWorkTimeStatisticsApi({
      jobTitle,
    });
    dispatch(setSalaryWorkTimeStatistics(jobTitle, getFetched(data)));
  } catch (error) {
    dispatch(setSalaryWorkTimeStatistics(jobTitle, getError(error)));
  }
};

const setInterviewExperiences = (
  jobTitle: string,
  box: FetchBox<JobTitleInterviewExperienceResult | null>,
): AnyAction => ({
  type: SET_INTERVIEW_EXPERIENCES,
  jobTitle,
  box,
});

export const queryJobTitleInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: JobTitleExperiencesPaginationInput): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = jobTitleInterviewExperiencesBoxSelectorByName(jobTitle)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setInterviewExperiences(jobTitle, toFetching(box)));

  try {
    const data = await getJobTitleInterviewExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setInterviewExperiences(jobTitle, getFetched(data)));
    }

    const interviewExperiencesyData = {
      name: data.name,
      companyName,
      start,
      limit,
      sortBy,
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
    };

    dispatch(
      setInterviewExperiences(jobTitle, getFetched(interviewExperiencesyData)),
    );

    // Update state.experiences which is the source of truth for all experiences
    data.interviewExperiencesResult.interviewExperiences.forEach(e => {
      // @ts-ignore
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setInterviewExperiences(jobTitle, getError(error)));
  }
};

const setWorkExperiences = (
  jobTitle: string,
  box: FetchBox<JobTitleWorkExperienceResult | null>,
): AnyAction => ({
  type: SET_WORK_EXPERIENCES,
  jobTitle,
  box,
});

export const queryJobTitleWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: JobTitleExperiencesPaginationInput): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = jobTitleWorkExperiencesBoxSelectorByName(jobTitle)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.name === jobTitle &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setWorkExperiences(jobTitle, toFetching(box)));

  try {
    const data = await getJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setWorkExperiences(jobTitle, getFetched(data)));
    }

    const workExperiencesData = {
      name: data.name,
      companyName,
      start,
      limit,
      sortBy,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(jobTitle, getFetched(workExperiencesData)));

    // Update state.experiences which is the source of truth for all experiences
    data.workExperiencesResult.workExperiences.forEach(e => {
      // @ts-ignore
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setWorkExperiences(jobTitle, getError(error)));
  }
};
