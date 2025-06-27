import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { queryJobTitleOverviewGql } from 'graphql/jobTitle';
import { SalaryWorkTime } from 'graphql/salaryWorkTime';
import { InterviewExperience, WorkExperience } from 'graphql/overview';

type QueryJobTitleOverviewData = {
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

const queryJobTitleOverview = ({
  jobTitle,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  jobTitle: string;
  interviewExperiencesLimit: number;
  workExperiencesLimit: number;
  salaryWorkTimesLimit: number;
}): Promise<QueryJobTitleOverviewData> =>
  graphqlClient<{ job_title: QueryJobTitleOverviewData }>({
    query: queryJobTitleOverviewGql,
    variables: {
      jobTitle,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('job_title'));

export default queryJobTitleOverview;
