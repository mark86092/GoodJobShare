import DataResultSortOption from 'apis/dataResultSortOption';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from './experience';

// TODO: 暫時放在這裡，之後搬回 api/
export interface JobTitle {
  name: string;
}

export type QueryJobTitlesData = {
  job_titles: JobTitle[];
};

export const queryJobTitles = /* GraphQL */ `
  query($key: String!) {
    job_titles(query: $key, page: 0) {
      name
    }
  }
`;

export type QueryJobTitleSalaryWorkTimeData = {
  job_title:
    | (JobTitle & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
      })
    | null;
};

export const queryJobTitleSalaryWorkTimeGql = /* GraphQL */ `
  query($jobTitle: String!, $companyName: String, $start: Int!, $limit: Int!) {
    job_title(name: $jobTitle) {
      name
      salaryWorkTimesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
      ) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
          id
          week_work_time
          salary {
            type
            amount
          }
          sector
          day_real_work_time
          day_promised_work_time
          experience_in_year
          estimated_hourly_wage
          overtime_frequency
          employment_type
          job_title {
            name
          }
          company {
            name
          }
          originalCompanyName
          data_time {
            month
            year
          }
          reportCount
          reports {
            id
            reasonCategory
            reason
            createdAt
          }
        }
      }
    }
  }
  ${fragmentSalaryWorkTimeFields}
`;

export type JobTitleExperiencesPaginationInput = {
  jobTitle: string;
  companyName?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};

// TODO
export type JobTitleInterviewExperience = unknown;

export type QueryJobTitleInterviewExperiencesData = {
  job_title:
    | (JobTitle & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: JobTitleInterviewExperience[];
        };
      })
    | null;
};

export const queryJobTitleInterviewExperiencesGql = /* GraphQL */ ``;

export const getJobTitleTimeAndSalaryStatisticsQuery = /* GraphQL */ `
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

export const getJobTitleInterviewExperiencesQuery = /* GraphQL */ `
  query(
    $jobTitle: String!
    $companyName: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    job_title(name: $jobTitle) {
      name
      interviewExperiencesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        interviewExperiences {
          ${experiencePartialGql}
          ${interviewExperiencePartialGql()}
        }
      }
    }
  }
`;

export type QueryJobTitlesHavingDataData = {
  jobTitlesHavingData: JobTitle[];
  jobTitlesHavingDataCount: number;
};

export const queryJobTitlesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    jobTitlesHavingData(start: $start, limit: $limit) {
      name
    }
    jobTitlesHavingDataCount
  }
`;
