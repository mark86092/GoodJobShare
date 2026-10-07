import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyTopNJobTitlesGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
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

const queryCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyTopNJobTitlesData['company']> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql(companyName),
    variables: companyVariables(companyName),
  }).then(data => data.company);

export default queryCompanyTopNJobTitles;
