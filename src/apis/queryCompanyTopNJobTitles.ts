import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

<<<<<<< HEAD
export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

type QueryCompanyTopNJobTitlesData = {
  company: (Company & { topNJobTitles: TopNJobTitles }) | null;
};

=======
>>>>>>> upstream/master
const queryCompanyTopNJobTitlesGql = /* GraphQL */ `
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

<<<<<<< HEAD
=======
export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

type QueryCompanyTopNJobTitlesData = {
  company:
    | (Company & {
        topNJobTitles: TopNJobTitles;
      })
    | null;
};

>>>>>>> upstream/master
const queryCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
<<<<<<< HEAD
}): Promise<TopNJobTitles | null> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.topNJobTitles : null));
=======
}): Promise<QueryCompanyTopNJobTitlesData['company']> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql,
    variables: { companyName },
  }).then(data => data.company);
>>>>>>> upstream/master

export default queryCompanyTopNJobTitles;
