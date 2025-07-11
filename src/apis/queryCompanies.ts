import graphqlClient from 'utils/graphqlClient';
import { Company } from './company';

const queryCompaniesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    companiesHavingData(start: $start, limit: $limit) {
      name
      businessNumber
      dataCount
    }
    companiesHavingDataCount
  }
`;

export type CompanyInIndex = Company & {
  businessNumber: string | null;
  dataCount: number;
};

type QueryCompaniesHavingDataData = {
  companiesHavingData: CompanyInIndex[];
  companiesHavingDataCount: number;
};

const queryCompanies = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}): Promise<QueryCompaniesHavingDataData> =>
  graphqlClient<QueryCompaniesHavingDataData>({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });

export default queryCompanies;
