import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  JobTitle,
  getJobTitleInterviewExperiencesQuery,
  QueryJobTitleInterviewExperiencesData,
  JobTitleInterviewExperience,
  queryJobTitleOverviewGql,
  QueryJobTitleOverviewData,
  getJobTitleTimeAndSalaryQuery,
  QueryJobTitleSalaryWorkTimeData,
  getJobTitleWorkExperiencesQuery,
  QueryJobTitleWorkExperiencesData,
  JobTitleWorkExperience,
  queryJobTitlesHavingDataGql,
  QueryJobTitlesHavingDataData,
  queryJobTitleSalaryWorkTimeStatisticsQuery,
  QueryJobTitleSalaryWorkTimeStatisticsData,
  JobTitleSalaryWorkTimeStatistics,
  queryJobTitleOverviewStatisticsGql,
  QueryJobTitleOverviewStatisticsData,
  SalaryWorkTimeStatisticsInJobTitleOverview,
  SalaryDistributionBin,
} from 'graphql/jobTitle';
import { InterviewExperience, WorkExperience } from 'graphql/overview';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';

export const queryJobTitleOverview = ({
  jobTitle,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  jobTitle: string;
  interviewExperiencesLimit: number;
  workExperiencesLimit: number;
  salaryWorkTimesLimit: number;
}): Promise<{
  name: string;
  salaryWorkTimesResult: {
    count: number;
    salaryWorkTimes: SalaryWorkTime[];
  };
  workExperiencesResult: {
    count: number;
    workExperiences: WorkExperience[];
  };
  interviewExperiencesResult: {
    count: number;
    interviewExperiences: InterviewExperience[];
  };
} | null> =>
  graphqlClient<QueryJobTitleOverviewData>({
    query: queryJobTitleOverviewGql,
    variables: {
      jobTitle,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('job_title'));

export const queryJobTitleOverviewStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<{
  salary_work_time_statistics: SalaryWorkTimeStatisticsInJobTitleOverview;
  salary_distribution: {
    bins: SalaryDistributionBin[] | null;
  };
} | null> =>
  graphqlClient<QueryJobTitleOverviewStatisticsData>({
    query: queryJobTitleOverviewStatisticsGql,
    variables: {
      jobTitle,
    },
  }).then(R.prop('job_title'));

export const getJobTitleTimeAndSalary = ({
  jobTitle,
  companyName,
  start,
  limit,
}: {
  jobTitle: string;
  companyName?: string | null;
  start: number;
  limit: number;
}): Promise<
  | (JobTitle & {
      salaryWorkTimesResult: {
        count: number;
        salaryWorkTimes: SalaryWorkTime[];
      };
    })
  | null
> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeData>({
    query: getJobTitleTimeAndSalaryQuery,
    variables: { jobTitle, companyName, start, limit },
  }).then(R.prop('job_title'));

export const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<JobTitleSalaryWorkTimeStatistics | null> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const getJobTitleInterviewExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
  sortBy,
}: {
  jobTitle: string;
  companyName?: string | null;
  start: number;
  limit: number;
  sortBy: string; // TODO
}): Promise<
  | (JobTitle & {
      interviewExperiencesResult: {
        count: number;
        interviewExperiences: JobTitleInterviewExperience[];
      };
    })
  | null
> =>
  graphqlClient<QueryJobTitleInterviewExperiencesData>({
    query: getJobTitleInterviewExperiencesQuery,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export const getJobTitleWorkExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
  sortBy,
}: {
  jobTitle: string;
  companyName?: string | null;
  start: number;
  limit: number;
  sortBy: string; // TODO
}): Promise<
  | (JobTitle & {
      workExperiencesResult: {
        count: number;
        workExperiences: JobTitleWorkExperience[];
      };
    })
  | null
> =>
  graphqlClient<QueryJobTitleWorkExperiencesData>({
    query: getJobTitleWorkExperiencesQuery,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}): Promise<QueryJobTitlesHavingDataData> =>
  graphqlClient<QueryJobTitlesHavingDataData>({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
