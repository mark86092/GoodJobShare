import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { queryCompanyOverviewGql } from 'graphql/company';

export type SalaryWorkTimeOverview = {
  id: string;
  week_work_time: number | null;
  salary: {
    type: string;
    amount: number;
  } | null;
  sector: string | null;
  day_real_work_time: number | null;
  day_promised_work_time: number | null;
  experience_in_year: number | null;
  estimated_hourly_wage: number | null;
  overtime_frequency: number | null;
  employment_type: string | null;
  job_title: {
    name: string;
  };
  company: {
    name: string;
  };
  originalCompanyName: string;
  data_time: {
    month: number;
    year: number;
  };
  reportCount: number;
  reports: {
    id: string;
    reasonCategory: string;
    reason: string | null;
    createdAt: string;
  }[];
};

export type WorkExperienceOverview = {
  id: string;
  type: string;
  originalCompanyName: string;
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: {
    amount: number;
    type: string;
  } | null;
  title: string | null;
  sections: {
    subtitle: string;
    content: string;
  }[];
  created_at: string;
  reply_count: number;
  like_count: number;
  recommend_to_others: string | null;
  averageSectionRating: number | null;
};

export type InterviewExperienceOverview = {
  id: string;
  type: string;
  originalCompanyName: string;
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: {
    amount: number;
    type: string;
  } | null;
  title: string | null;
  sections: {
    subtitle: string;
    content: string;
  }[];
  created_at: string; // ISO date string
  reply_count: number;
  like_count: number;
  averageSectionRating: number | null;
};

type QueryCompanyOverviewData = {
  name: string;
  salaryWorkTimesResult: {
    count: number;
    salaryWorkTimes: SalaryWorkTimeOverview[];
  };
  workExperiencesResult: {
    count: number;
    workExperiences: WorkExperienceOverview[];
  };
  interviewExperiencesResult: {
    count: number;
    interviewExperiences: InterviewExperienceOverview[];
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
