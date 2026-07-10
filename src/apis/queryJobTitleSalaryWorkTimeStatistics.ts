<<<<<<< HEAD
import R from 'ramda';

import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';
import { JobTitle } from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleSalaryWorkTimeStatisticsQuery = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
      name
=======
import { OvertimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleSalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
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
export type JobTitleSalaryWorkTimeStatistics = JobTitle & {
  salary_work_time_statistics: SalaryWorkTimeStatistics;
};

type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: JobTitleSalaryWorkTimeStatistics | null;
=======
type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: { salary_work_time_statistics: OvertimeStats } | null;
>>>>>>> cc889ec0
};

const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
<<<<<<< HEAD
}): Promise<QueryJobTitleSalaryWorkTimeStatisticsData['job_title']> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));
=======
}): Promise<OvertimeStats | null> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsGql,
    variables: { jobTitle },
  }).then(data =>
    data.job_title ? data.job_title.salary_work_time_statistics : null,
  );
>>>>>>> cc889ec0

export default queryJobTitleSalaryWorkTimeStatistics;
