import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { getJobTitleTimeAndSalaryStatisticsQuery } from 'graphql/jobTitle';
import { SalaryWorkTimeStatistics } from 'graphql/salaryWorkTime';

type QueryJobTitleTimeAndSalaryStatisticsData = {
  name: string;
  salary_work_time_statistics: SalaryWorkTimeStatistics;
} | null;

const getJobTitleTimeAndSalaryStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleTimeAndSalaryStatisticsData> =>
  graphqlClient<{ job_title: QueryJobTitleTimeAndSalaryStatisticsData }>({
    query: getJobTitleTimeAndSalaryStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export default getJobTitleTimeAndSalaryStatistics;
