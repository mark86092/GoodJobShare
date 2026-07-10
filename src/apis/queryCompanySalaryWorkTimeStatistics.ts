<<<<<<< HEAD
import R from 'ramda';

import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

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
=======
import { OvertimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryCompanySalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
>>>>>>> cc889ec0
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

<<<<<<< HEAD
=======
type QueryCompanySalaryWorkTimeStatisticsData = {
  company: { salary_work_time_statistics: OvertimeStats } | null;
};

>>>>>>> cc889ec0
const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
<<<<<<< HEAD
}): Promise<CompanySalaryWorkTimeStatistics | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(R.prop('company'));
=======
}): Promise<OvertimeStats | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(data =>
    data.company ? data.company.salary_work_time_statistics : null,
  );
>>>>>>> cc889ec0

export default queryCompanySalaryWorkTimeStatistics;
