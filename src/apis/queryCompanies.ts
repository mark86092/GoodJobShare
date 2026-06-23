<<<<<<< HEAD
import { Company } from 'graphql/company';
=======
>>>>>>> upstream/master
import graphqlClient from 'utils/graphqlClient';

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

<<<<<<< HEAD
export type CompanyInIndex = Company & {
=======
export type CompanyInIndex = {
  name: string;
>>>>>>> upstream/master
  businessNumber: string | null;
  dataCount: number;
};

<<<<<<< HEAD
type QueryCompaniesHavingDataData = {
=======
type QueryCompaniesData = {
>>>>>>> upstream/master
  companiesHavingData: CompanyInIndex[];
  companiesHavingDataCount: number;
};

const queryCompanies = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
<<<<<<< HEAD
}): Promise<QueryCompaniesHavingDataData> =>
  graphqlClient<QueryCompaniesHavingDataData>({
=======
}): Promise<QueryCompaniesData> =>
  graphqlClient<QueryCompaniesData>({
>>>>>>> upstream/master
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });

export default queryCompanies;
