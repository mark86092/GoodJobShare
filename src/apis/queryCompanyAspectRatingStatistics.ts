import R from 'ramda';

import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

import {
  AspectRatingStatistics,
  fragmentAspectRatingStatisticsFields,
} from './aspectRatingStatistics';

const queryCompanyAspectRatingStatisticsGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
      name
      companyAspectRatingStatistics {
        ...aspectRatingStatisticsFields
      }
    }
  }
  ${fragmentAspectRatingStatisticsFields}
`;

type QueryCompanyAspectRatingStatisticsData = {
  company:
    | (Company & {
        companyAspectRatingStatistics: AspectRatingStatistics[];
      })
    | null;
};

const queryCompanyAspectRatingStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyAspectRatingStatisticsData['company']> =>
  graphqlClient<QueryCompanyAspectRatingStatisticsData>({
    query: queryCompanyAspectRatingStatisticsGql(companyName),
    variables: companyVariables(companyName),
  }).then(R.prop('company'));

export default queryCompanyAspectRatingStatistics;
