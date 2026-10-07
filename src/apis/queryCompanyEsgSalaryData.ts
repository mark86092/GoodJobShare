import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyEsgSalaryDataGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
      esgSalaryData {
        avgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerAvgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerMedianSalaryStatistics {
          year
          median
        }
        femaleManagerStatistics {
          year
          percentage
        }
      }
    }
  }
`;

type AvgSalaryStatistics = {
  year: number;
  average: number;
  sameIndustryAverage: number;
};

type MedianSalaryStatistics = {
  year: number;
  median: number;
};

type FemaleManagerStatistics = {
  year: number;
  percentage: number;
};

export type ESGSalaryData = {
  avgSalaryStatistics: AvgSalaryStatistics[];
  nonManagerAvgSalaryStatistics: AvgSalaryStatistics[];
  nonManagerMedianSalaryStatistics: MedianSalaryStatistics[];
  femaleManagerStatistics: FemaleManagerStatistics[];
};

type QueryCompanyEsgSalaryDataData = {
  company: {
    esgSalaryData: ESGSalaryData | null;
  } | null;
};

const queryCompanyEsgSalaryData = ({
  companyName,
}: {
  companyName: string;
}): Promise<ESGSalaryData | null> =>
  graphqlClient<QueryCompanyEsgSalaryDataData>({
    query: queryCompanyEsgSalaryDataGql(companyName),
    variables: companyVariables(companyName),
  }).then(data => (data.company ? data.company.esgSalaryData : null));

export default queryCompanyEsgSalaryData;
