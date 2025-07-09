import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleInterviewExperiencesQuery,
  QueryJobTitleInterviewExperiencesData,
  getJobTitleTimeAndSalaryQuery,
  QueryJobTitleSalaryWorkTimeData,
  getJobTitleWorkExperiencesQuery,
  QueryJobTitleWorkExperiencesData,
  queryJobTitlesHavingDataGql,
  QueryJobTitlesHavingDataData,
  queryJobTitleSalaryWorkTimeStatisticsQuery,
  QueryJobTitleSalaryWorkTimeStatisticsData,
  queryJobTitleOverviewStatisticsGql,
  QueryJobTitleOverviewStatisticsData,
  JobTitleExperiencesPaginationInput,
} from 'graphql/jobTitle';

export const queryJobTitleOverviewStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleOverviewStatisticsData['job_title']> =>
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
}): Promise<QueryJobTitleSalaryWorkTimeData['job_title']> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeData>({
    query: getJobTitleTimeAndSalaryQuery,
    variables: { jobTitle, companyName, start, limit },
  }).then(R.prop('job_title'));

export const getJobTitleTimeAndSalaryStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleSalaryWorkTimeStatisticsData['job_title']> =>
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
}: JobTitleExperiencesPaginationInput): Promise<
  QueryJobTitleInterviewExperiencesData['job_title']
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
}: JobTitleExperiencesPaginationInput): Promise<
  QueryJobTitleWorkExperiencesData['job_title']
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
