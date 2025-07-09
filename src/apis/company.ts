import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  queryCompanyInterviewExperiencesGql,
  QueryCompanyInterviewExperiencesData,
  queryCompanyWorkExperiencesGql,
  QueryCompanyWorkExperiencesData,
  queryCompaniesHavingDataGql,
  QueryCompaniesHavingDataData,
  queryCompanySalaryWorkTimeStatisticsGql,
  QueryCompanySalaryWorkTimeStatisticsData,
  CompanySalaryWorkTimeStatistics,
  queryCompanyTopNJobTitlesGql,
  QueryCompanyTopNJobTitlesData,
  TopNJobTitles,
  queryCompanyEsgSalaryDataGql,
  QueryCompanyEsgSalaryDataData,
  ESGSalaryData,
  queryCompanyIsSubscribedGql,
  QueryCompanyIsSubscribedData,
  subscribeCompanyGql,
  SubscribeCompanyData,
  unsubscribeCompanyGql,
  UnsubscribeCompanyData,
  CompanyExperiencesPaginationInput,
} from 'graphql/company';

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
}): Promise<TopNJobTitles | null> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.topNJobTitles : null));

export const getCompanyEsgSalaryData = ({
  companyName,
}: {
  companyName: string;
}): Promise<ESGSalaryData | null> =>
  graphqlClient<QueryCompanyEsgSalaryDataData>({
    query: queryCompanyEsgSalaryDataGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.esgSalaryData : null));

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: CompanyExperiencesPaginationInput): Promise<
  QueryCompanyInterviewExperiencesData['company']
> =>
  graphqlClient<QueryCompanyInterviewExperiencesData>({
    query: queryCompanyInterviewExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const getCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: CompanyExperiencesPaginationInput): Promise<
  QueryCompanyWorkExperiencesData['company']
> =>
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: queryCompanyWorkExperiencesGql,
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
