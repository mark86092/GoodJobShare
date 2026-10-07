import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyNameGql = (companyKey: string): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
      name
    }
  }
`;

type QueryCompanyNameData = {
  company: { name: string } | null;
};

const queryCompanyName = ({
  companyName,
}: {
  companyName: string;
}): Promise<string | null> =>
  graphqlClient<QueryCompanyNameData>({
    query: queryCompanyNameGql(companyName),
    variables: companyVariables(companyName),
  }).then(data => (data.company ? data.company.name : null));

export default queryCompanyName;
