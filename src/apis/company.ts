import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import DataResultSortOption from 'apis/dataResultSortOption';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';
import { CompanyWorkExperience } from './queryCompanyWorkExperiences';

export interface Company {
  name: string;
}

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};

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
