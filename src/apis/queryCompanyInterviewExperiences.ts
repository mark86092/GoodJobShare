import R from 'ramda';

import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { InterviewExperience } from 'apis/experience';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyInterviewExperiencesGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(
    ${companyVariableDef(companyKey)}
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    ${companyField(companyKey)} {
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

type QueryCompanyInterviewExperiencesData = {
  company:
    | (Company & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: InterviewExperience[];
        };
      })
    | null;
};

const queryCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Promise<QueryCompanyInterviewExperiencesData['company']> =>
  graphqlClient<QueryCompanyInterviewExperiencesData>({
    query: queryCompanyInterviewExperiencesGql(companyName),
    variables: {
      ...companyVariables(companyName),
      jobTitle,
      start,
      limit,
      sortBy,
    },
  }).then(R.prop('company'));

export default queryCompanyInterviewExperiences;
