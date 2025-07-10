import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';
import { JobTitle } from 'graphql/jobTitle';

const queryJobTitleSalaryWorkTimeStatisticsQuery = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
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

export type JobTitleSalaryWorkTimeStatistics = JobTitle & {
  salary_work_time_statistics: SalaryWorkTimeStatistics;
};

type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: JobTitleSalaryWorkTimeStatistics | null;
};

const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleSalaryWorkTimeStatisticsData['job_title']> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export default queryJobTitleSalaryWorkTimeStatistics;
