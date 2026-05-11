import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { ExperienceType } from './experience';

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

export type RatingDistribution = {
  count: number;
  rating: number;
};

export type CompanyAspectRatingStatistic = {
  aspect: string;
  averageRating: number;
  ratingCount: number;
  type: ExperienceType;
  ratingDistribution: RatingDistribution[];
};

type QueryCompanyWorkExperiencesAspectRatingStatisticsData = {
  company:
    | (Company & {
        companyAspectRatingStatistics: CompanyAspectRatingStatistic[];
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
