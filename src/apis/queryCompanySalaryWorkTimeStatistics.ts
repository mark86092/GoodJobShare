import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import { OvertimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryCompanySalaryWorkTimeStatisticsGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
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

type QueryCompanySalaryWorkTimeStatisticsData = {
  company: { salary_work_time_statistics: OvertimeStats } | null;
};

const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<OvertimeStats | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql(companyName),
    variables: companyVariables(companyName),
  }).then(data =>
    data.company ? data.company.salary_work_time_statistics : null,
  );

export default queryCompanySalaryWorkTimeStatistics;
