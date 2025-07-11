import DataResultSortOption from 'apis/dataResultSortOption';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from './experience';

export interface Company {
  name: string;
}

export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

export type QueryCompanyTopNJobTitlesData = {
  company: (Company & { topNJobTitles: TopNJobTitles }) | null;
};

export const queryCompanyTopNJobTitlesGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      topNJobTitles {
        work {
          name
        }
        interview {
          name
        }
        salary {
          name
        }
        all {
          name
        }
      }
    }
  }
`;

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};

// TODO
export type CompanyInterviewExperience = {};

export type QueryCompanyInterviewExperiencesData = {
  company:
    | (Company & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: CompanyInterviewExperience[];
        };
      })
    | null;
};

export const queryCompanyInterviewExperiencesGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        interviewExperiences {
          ${experiencePartialGql}
          ${interviewExperiencePartialGql()}
        }
      }
    }
  }
`;

// TODO
export type CompanyWorkExperience = {};

export type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: CompanyWorkExperience[];
        };
      })
    | null;
};

export const queryCompanyWorkExperiencesGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        workExperiences {
          ${experiencePartialGql}
          ${workExperiencesPartialGql()}
        }
      }
    }
  }
`;

export type CompanyInIndex = Company & {
  businessNumber: string | null;
  dataCount: number;
};

export type QueryCompaniesHavingDataData = {
  companiesHavingData: CompanyInIndex[];
  companiesHavingDataCount: number;
};

export const queryCompaniesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    companiesHavingData(start: $start, limit: $limit) {
      name
      businessNumber
      dataCount
    }
    companiesHavingDataCount
  }
`;

export type QueryCompanyIsSubscribedData = {
  company: {
    id: string;
    isSubscribed: boolean;
  } | null;
};

export const queryCompanyIsSubscribedGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      id
      isSubscribed
    }
  }
`;

export type SubscribeCompanyData = { subscribeCompany: { success: boolean } };

export const subscribeCompanyGql = /* GraphQL */ `
  mutation SubscribeCompany($input: SubscribeCompanyInput!) {
    subscribeCompany(input: $input) {
      success
    }
  }
`;

export type UnsubscribeCompanyData = {
  unsubscribeCompany: { success: boolean };
};

export const unsubscribeCompanyGql = /* GraphQL */ `
  mutation UnsubscribeCompany($input: UnsubscribeCompanyInput!) {
    unsubscribeCompany(input: $input) {
      success
    }
  }
`;
