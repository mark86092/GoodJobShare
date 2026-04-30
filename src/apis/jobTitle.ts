import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  queryJobTitleInterviewExperiencesGql,
  QueryJobTitleInterviewExperiencesData,
  queryJobTitleSalaryWorkTimeGql,
  QueryJobTitleSalaryWorkTimeData,
  getJobTitleWorkExperiencesQuery,
  QueryJobTitleWorkExperiencesData,
  queryJobTitlesHavingDataGql,
  QueryJobTitlesHavingDataData,
  JobTitleExperiencesPaginationInput,
} from 'graphql/jobTitle';

export const queryJobTitleSalaryWorkTime = ({
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
    query: queryJobTitleSalaryWorkTimeGql,
    variables: { jobTitle, companyName, start, limit },
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
    query: queryJobTitleInterviewExperiencesGql,
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
