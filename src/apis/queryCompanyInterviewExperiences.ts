import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { CompanyExperiencesPaginationInput } from 'apis/company';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from 'graphql/experience';

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

const queryCompanyInterviewExperiences = ({
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

export default queryCompanyInterviewExperiences;
