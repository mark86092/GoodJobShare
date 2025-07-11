import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';

export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

type QueryCompanyTopNJobTitlesData = {
  company: (Company & { topNJobTitles: TopNJobTitles }) | null;
};

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

const getCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
}): Promise<TopNJobTitles | null> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.topNJobTitles : null));

export default getCompanyTopNJobTitles;
