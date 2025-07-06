import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  Company,
  queryCompanyRatingStatisticsGql,
  QueryCompanyRatingStatisticsData,
  RatingStatistics,
  queryCompanyOverviewGql,
  QueryCompanyOverviewData,
  getCompanyTimeAndSalaryQuery,
  QueryCompanySalaryWorkTimeData,
  getCompanyInterviewExperiencesQuery,
  QueryCompanyInterviewExperiencesData,
  CompanyInterviewExperience,
  getCompanyWorkExperiencesQuery,
  QueryCompanyWorkExperiencesData,
  CompanyWorkExperience,
  queryCompaniesHavingDataGql,
  QueryCompaniesHavingDataData,
  queryCompanySalaryWorkTimeStatisticsGql,
  QueryCompanySalaryWorkTimeStatisticsData,
  CompanySalaryWorkTimeStatistics,
  getCompanyTopNJobTitlesQuery,
  QueryCompanyTopNJobTitlesData,
  getCompanyEsgSalaryDataQuery,
  QueryCompanyEsgSalaryDataData,
  ESGSalaryData,
  queryCompanyOverviewStatisticsQuery,
  QueryCompanyOverviewStatisticsData,
  SalaryWorkTimeStatisticsInCompanyOverview,
  queryCompanyIsSubscribedGql,
  QueryCompanyIsSubscribedData,
  subscribeCompanyGql,
  SubscribeCompanyData,
  unsubscribeCompanyGql,
  UnsubscribeCompanyData,
  TopNJobTitles,
} from 'graphql/company';
import { InterviewExperience, WorkExperience } from 'graphql/overview';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';

export const queryCompanyRatingStatisticsApi = ({
  companyName,
}: {
  companyName: string;
}): Promise<RatingStatistics | null> =>
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

export const queryCompanyOverviewStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<{
  salary_work_time_statistics: SalaryWorkTimeStatisticsInCompanyOverview;
} | null> =>
  graphqlClient<QueryCompanyOverviewStatisticsData>({
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
}: {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
}): Promise<
  | (Company & {
      salaryWorkTimesResult: {
        count: number;
        salaryWorkTimes: SalaryWorkTime[];
      };
    })
  | null
> =>
  graphqlClient<QueryCompanySalaryWorkTimeData>({
    query: getCompanyTimeAndSalaryQuery,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<CompanySalaryWorkTimeStatistics | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
}): Promise<(Company & { topNJobTitles: TopNJobTitles }) | null> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: getCompanyTopNJobTitlesQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyEsgSalaryData = ({
  companyName,
}: {
  companyName: string;
}): Promise<ESGSalaryData | null> =>
  graphqlClient<QueryCompanyEsgSalaryDataData>({
    query: getCompanyEsgSalaryDataQuery,
    variables: { companyName },
  }).then(data => (data.company ? data.company.esgSalaryData : null));

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy: string; // TODO
}): Promise<
  | (Company & {
      interviewExperiencesResult: {
        count: number;
        interviewExperiences: CompanyInterviewExperience[];
      };
    })
  | null
> =>
  graphqlClient<QueryCompanyInterviewExperiencesData>({
    query: getCompanyInterviewExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const getCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy: string; // TODO
}): Promise<
  | (Company & {
      workExperiencesResult: {
        count: number;
        workExperiences: CompanyWorkExperience[];
      };
    })
  | null
> =>
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: getCompanyWorkExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}): Promise<QueryCompaniesHavingDataData> =>
  graphqlClient<QueryCompaniesHavingDataData>({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });

export const queryCompanyIsSubscribedApi = async ({
  companyName,
  token,
}: {
  companyName: string;
  token?: string;
}): Promise<{ isSubscribed: boolean; companyId: string | null }> => {
  const data = await graphqlClient<QueryCompanyIsSubscribedData>({
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

export const subscribeCompanyApi = async ({
  companyId,
  token,
}: {
  companyId: string;
  token?: string;
}): Promise<boolean> => {
  const data = await graphqlClient<SubscribeCompanyData>({
    query: subscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.subscribeCompany.success;
};

export const unsubscribeCompanyApi = async ({
  companyId,
  token,
}: {
  companyId: string;
  token?: string;
}): Promise<boolean> => {
  const data = await graphqlClient<UnsubscribeCompanyData>({
    query: unsubscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.unsubscribeCompany.success;
};
