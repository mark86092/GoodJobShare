import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  queryCompanyRatingStatisticsGql,
  QueryCompanyRatingStatisticsData,
  CompanyRatingStatistics,
  queryCompanyOverviewGql,
  QueryCompanyOverviewData,
  getCompanyTimeAndSalaryQuery,
  getCompanyInterviewExperiencesQuery,
  getCompanyWorkExperiencesQuery,
  queryCompaniesHavingDataGql,
  getCompanyTimeAndSalaryStatisticsQuery,
  QueryCompanyTimeAndSalaryStatisticsData,
  getCompanyTopNJobTitlesQuery,
  getCompanyEsgSalaryDataQuery,
  queryCompanyOverviewStatisticsQuery,
  queryCompanyIsSubscribedGql,
  subscribeCompanyGql,
  unsubscribeCompanyGql,
} from 'graphql/company';
import { InterviewExperience, WorkExperience } from 'graphql/overview';
import {
  SalaryWorkTime,
  SalaryWorkTimeStatistics,
} from 'graphql/salaryWorkTime';

export const queryCompanyRatingStatisticsApi = ({
  companyName,
}: {
  companyName: string;
}): Promise<CompanyRatingStatistics | null> =>
  graphqlClient<QueryCompanyRatingStatisticsData>({
    query: queryCompanyRatingStatisticsGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.companyRatingStatistics : null));

export const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  companyName: string;
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
  graphqlClient<QueryCompanyOverviewData>({
    query: queryCompanyOverviewGql,
    variables: {
      companyName,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('company'));

export const queryCompanyOverviewStatistics = ({ companyName }) =>
  graphqlClient({
    query: queryCompanyOverviewStatisticsQuery,
    variables: {
      companyName,
    },
  }).then(R.prop('company'));

export const getCompanyTimeAndSalary = ({
  companyName,
  jobTitle,
  start,
  limit,
}) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryQuery,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export const queryCompanyTimeAndSalaryStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<{
  name: string;
  salary_work_time_statistics: SalaryWorkTimeStatistics;
} | null> =>
  graphqlClient<QueryCompanyTimeAndSalaryStatisticsData>({
    query: getCompanyTimeAndSalaryStatisticsQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyTopNJobTitles = ({ companyName }) =>
  graphqlClient({
    query: getCompanyTopNJobTitlesQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyEsgSalaryData = ({ companyName }) =>
  graphqlClient({
    query: getCompanyEsgSalaryDataQuery,
    variables: { companyName },
  }).then(R.path(['company', 'esgSalaryData']));

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyInterviewExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const getCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyWorkExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });

export const queryCompanyIsSubscribedApi = async ({ companyName, token }) => {
  const data = await graphqlClient({
    query: queryCompanyIsSubscribedGql,
    token,
    variables: { companyName },
  });

  if (!data.company) {
    return {
      isSubscribed: false,
      companyId: null,
    };
  }

  return {
    isSubscribed: data.company.isSubscribed,
    companyId: data.company.id,
  };
};

export const subscribeCompanyApi = async ({ companyId, token }) => {
  const data = await graphqlClient({
    query: subscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.subscribeCompany.success;
};

export const unsubscribeCompanyApi = async ({ companyId, token }) => {
  const data = await graphqlClient({
    query: unsubscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.unsubscribeCompany.success;
};
