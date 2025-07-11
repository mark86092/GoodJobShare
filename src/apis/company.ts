import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import DataResultSortOption from 'apis/dataResultSortOption';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};

// TODO
export type CompanyInterviewExperience = {};

type QueryCompanyInterviewExperiencesData = {
  company:
    | (Company & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: CompanyInterviewExperience[];
        };
      })
    | null;
};

const queryCompanyInterviewExperiencesGql = /* GraphQL */ `
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

export const queryCompanyInterviewExperiences = ({
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

// TODO
export type CompanyWorkExperience = {};

type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: CompanyWorkExperience[];
        };
      })
    | null;
};

const queryCompanyWorkExperiencesGql = /* GraphQL */ `
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

export const queryCompanyWorkExperiences = ({
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
