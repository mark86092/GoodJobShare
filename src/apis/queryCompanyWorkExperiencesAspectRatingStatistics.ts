import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { AspectRatingStatistics } from './aspectRatingStatistics';

const queryCompanyWorkExperiencesAspectRatingStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      companyAspectRatingStatistics {
        aspect
        averageRating
        ratingCount
        type
        ratingDistribution {
          count
          rating
        }
      }
    }
  }
`;

type QueryCompanyWorkExperiencesAspectRatingStatisticsData = {
  company:
    | (Company & {
        companyAspectRatingStatistics: AspectRatingStatistics[];
      })
    | null;
};

const queryCompanyWorkExperiencesAspectRatingStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyWorkExperiencesAspectRatingStatisticsData['company']> =>
  graphqlClient<QueryCompanyWorkExperiencesAspectRatingStatisticsData>({
    query: queryCompanyWorkExperiencesAspectRatingStatisticsGql,
    variables: { companyName },
  }).then(R.prop('company'));

export default queryCompanyWorkExperiencesAspectRatingStatistics;
