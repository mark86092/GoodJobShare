import R from 'ramda';

import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import {
  fragmentInterviewExperienceFields,
  fragmentWorkExperienceFields,
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyOverviewGql = (companyKey: string): string => /* GraphQL */ `
  query(
    ${companyVariableDef(companyKey)}
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    ${companyField(companyKey)} {
      name
      interviewExperiencesResult(start: 0, limit: $interviewExperiencesLimit) {
        count
        interviewExperiences {
          ...interviewExperienceFields
        }
      }
      workExperiencesResult(start: 0, limit: $workExperiencesLimit) {
        count
        workExperiences {
          ...workExperienceFields
        }
      }
      salaryWorkTimesResult(start: 0, limit: $salaryWorkTimesLimit) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
        }
      }
    }
  }
  ${fragmentInterviewExperienceFields}
  ${fragmentWorkExperienceFields}
  ${fragmentSalaryWorkTimeFields}
`;

type QueryCompanyOverviewData = {
  company:
    | (Company & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperienceInOverview[];
        };
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: InterviewExperienceInOverview[];
        };
      })
    | null;
};

const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  companyName: string;
  interviewExperiencesLimit: number;
  workExperiencesLimit: number;
  salaryWorkTimesLimit: number;
}): Promise<QueryCompanyOverviewData['company']> =>
  graphqlClient<QueryCompanyOverviewData>({
    query: queryCompanyOverviewGql(companyName),
    variables: {
      ...companyVariables(companyName),
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('company'));

export default queryCompanyOverview;
