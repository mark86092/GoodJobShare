import R from 'ramda';

import {
<<<<<<< HEAD
=======
  DataTimeRange,
  ExperienceInYearRange,
>>>>>>> upstream/master
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

<<<<<<< HEAD
=======
const queryCompanySalaryWorkTimeGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $dataTimeRange: DataTimeRange
    $experienceInYearRange: ExperienceInYearRange
    $gender: Gender
    $sortBy: SalaryResultSortOption
  ) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        dataTimeRange: $dataTimeRange
        experienceInYearRange: $experienceInYearRange
        gender: $gender
        sortBy: $sortBy
      ) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
        }
      }
    }
  }
  ${fragmentSalaryWorkTimeFields}
`;

>>>>>>> upstream/master
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

<<<<<<< HEAD
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

=======
>>>>>>> upstream/master
const queryCompanySalaryWorkTime = ({
  companyName,
  jobTitle,
  start,
  limit,
<<<<<<< HEAD
}: {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
}): Promise<QueryCompanySalaryWorkTimeData['company']> =>
  graphqlClient<QueryCompanySalaryWorkTimeData>({
    query: queryCompanySalaryWorkTimeGql,
    variables: { companyName, jobTitle, start, limit },
=======
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  dataTimeRange?: DataTimeRange;
  experienceInYearRange?: ExperienceInYearRange;
  gender?: string;
  sortBy?: string;
}): Promise<QueryCompanySalaryWorkTimeData['company']> =>
  graphqlClient<QueryCompanySalaryWorkTimeData>({
    query: queryCompanySalaryWorkTimeGql,
    variables: {
      companyName,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    },
>>>>>>> upstream/master
  }).then(R.prop('company'));

export default queryCompanySalaryWorkTime;
