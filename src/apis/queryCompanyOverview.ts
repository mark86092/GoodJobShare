import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { queryCompanyOverviewGql } from 'graphql/company';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';
import { InterviewExperience, WorkExperience } from 'graphql/overview';

type QueryCompanyOverviewData = {
  name: string;
  salaryWorkTimesResult: {
    count: number;
    salaryWorkTimes: SalaryWorkTime[];
  };
  workExperiencesResult: {
    count: number;
    workExperiences: WorkExperience[];
  };
  interviewExperiencesResult: {
    count: number;
    interviewExperiences: InterviewExperience[];
  };
} | null;

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
}): Promise<QueryCompanyOverviewData> =>
  graphqlClient<{ company: QueryCompanyOverviewData }>({
    query: queryCompanyOverviewGql,
    variables: {
      companyName,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('company'));

export default queryCompanyOverview;
