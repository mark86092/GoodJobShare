import R from 'ramda';

<<<<<<< HEAD
=======
import { InterviewExperience } from 'apis/experience';
>>>>>>> upstream/master
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

<<<<<<< HEAD
// TODO
export type CompanyInterviewExperience = unknown;

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

=======
>>>>>>> upstream/master
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

<<<<<<< HEAD
=======
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

>>>>>>> upstream/master
const queryCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
<<<<<<< HEAD
  jobTitle?: string | null;
=======
  jobTitle?: string;
>>>>>>> upstream/master
  start: number;
  limit: number;
  sortBy?: string;
}): Promise<QueryCompanyInterviewExperiencesData['company']> =>
  graphqlClient<QueryCompanyInterviewExperiencesData>({
    query: queryCompanyInterviewExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export default queryCompanyInterviewExperiences;
