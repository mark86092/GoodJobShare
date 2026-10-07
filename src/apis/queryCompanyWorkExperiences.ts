import R from 'ramda';

import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { WorkExperience } from 'apis/experience';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyWorkExperiencesGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(
    ${companyVariableDef(companyKey)}
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
    $aspectFilter: AspectFilter
  ) {
    ${companyField(companyKey)} {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
        aspectFilter: $aspectFilter
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

// Must be the same as graphql schema (AspectFilter)
export type AspectFilter = {
  aspect: string;
  rating?: number;
};

type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperience[];
        };
      })
    | null;
};

const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
  aspectFilter,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
  aspectFilter?: AspectFilter;
}): Promise<QueryCompanyWorkExperiencesData['company']> =>
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: queryCompanyWorkExperiencesGql(companyName),
    variables: {
      ...companyVariables(companyName),
      jobTitle,
      start,
      limit,
      sortBy,
      aspectFilter,
    },
  }).then(R.prop('company'));

export default queryCompanyWorkExperiences;
