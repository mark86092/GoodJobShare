import R from 'ramda';

import {
  JobTitleExperiencesPaginationInput,
  QueryJobTitleInterviewExperiencesData,
  queryJobTitleInterviewExperiencesGql,
  QueryJobTitleSalaryWorkTimeData,
  queryJobTitleSalaryWorkTimeGql,
  QueryJobTitlesHavingDataData,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

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
