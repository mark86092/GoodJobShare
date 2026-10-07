import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyRatingStatisticsGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
      name
      companyRatingStatistics {
        averageRating
        ratingDistribution {
          rating
          count
        }
        ratingCount
      }
    }
  }
`;

export type RatingStatistics = {
  averageRating: number;
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  ratingCount: number;
};

type QueryCompanyRatingStatisticsData = {
  company:
    | (Company & {
        companyRatingStatistics: RatingStatistics | null;
      })
    | null;
};

const queryCompanyRatingStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<RatingStatistics | null> =>
  graphqlClient<QueryCompanyRatingStatisticsData>({
    query: queryCompanyRatingStatisticsGql(companyName),
    variables: companyVariables(companyName),
  }).then(data => (data.company ? data.company.companyRatingStatistics : null));

export default queryCompanyRatingStatistics;
