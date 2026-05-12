import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
<<<<<<< HEAD
import { CompanyExperiencesPaginationInput } from 'apis/company';
import { Company } from 'graphql/company';
=======
import { Company } from 'graphql/company';
import { WorkExperience } from 'apis/experience';
>>>>>>> upstream/master
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';

<<<<<<< HEAD
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

=======
>>>>>>> upstream/master
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

<<<<<<< HEAD
=======
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

>>>>>>> upstream/master
const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
<<<<<<< HEAD
}: CompanyExperiencesPaginationInput): Promise<
  QueryCompanyWorkExperiencesData['company']
> =>
=======
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Promise<QueryCompanyWorkExperiencesData['company']> =>
>>>>>>> upstream/master
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: queryCompanyWorkExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export default queryCompanyWorkExperiences;
