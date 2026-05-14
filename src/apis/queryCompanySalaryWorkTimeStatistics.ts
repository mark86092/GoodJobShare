import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';

export type CompanySalaryWorkTimeStatistics = Company & {
  salary_work_time_statistics: SalaryWorkTimeStatistics;
};

type QueryCompanySalaryWorkTimeStatisticsData = {
  company: CompanySalaryWorkTimeStatistics | null;
};

export const queryCompanySalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      salary_work_time_statistics {
        count
        is_overtime_salary_legal_count {
          yes
          no
          unknown
        }
        has_compensatory_dayoff_count {
          yes
          no
          unknown
        }
        has_overtime_salary_count {
          yes
          no
          unknown
        }
      }
    }
  }
`;

const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<CompanySalaryWorkTimeStatistics | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(R.prop('company'));

export default queryCompanySalaryWorkTimeStatistics;
