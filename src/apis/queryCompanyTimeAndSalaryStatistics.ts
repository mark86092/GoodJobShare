import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { getCompanyTimeAndSalaryStatisticsQuery } from 'graphql/company';
import { SalaryWorkTimeStatistics } from 'graphql/salaryWorkTime';

type QueryCompanyTimeAndSalaryStatisticsData = {
  name: string;
  salary_work_time_statistics: SalaryWorkTimeStatistics;
} | null;

const queryCompanyTimeAndSalaryStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyTimeAndSalaryStatisticsData> =>
  graphqlClient<{ company: QueryCompanyTimeAndSalaryStatisticsData }>({
    query: getCompanyTimeAndSalaryStatisticsQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export default queryCompanyTimeAndSalaryStatistics;
