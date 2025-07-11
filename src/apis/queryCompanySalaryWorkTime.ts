import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { Company } from './company';

type QueryCompanySalaryWorkTimeData = {
  company:
    | (Company & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
      })
    | null;
};

const queryCompanySalaryWorkTimeGql = /* GraphQL */ `
  query($companyName: String!, $jobTitle: String, $start: Int!, $limit: Int!) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(jobTitle: $jobTitle, start: $start, limit: $limit) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
        }
      }
    }
  }
  ${fragmentSalaryWorkTimeFields}
`;

const queryCompanySalaryWorkTime = ({
  companyName,
  jobTitle,
  start,
  limit,
}: {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
}): Promise<QueryCompanySalaryWorkTimeData['company']> =>
  graphqlClient<QueryCompanySalaryWorkTimeData>({
    query: queryCompanySalaryWorkTimeGql,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export default queryCompanySalaryWorkTime;
