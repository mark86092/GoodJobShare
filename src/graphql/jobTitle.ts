<<<<<<< HEAD
import DataResultSortOption from 'apis/dataResultSortOption';
=======
>>>>>>> upstream/master
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from './experience';
<<<<<<< HEAD
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

=======

// TODO: 暫時放在這裡，之後搬回 api/
>>>>>>> upstream/master
export interface JobTitle {
  name: string;
}

<<<<<<< HEAD
export type QueryJobTitlesData = {
  job_titles: JobTitle[];
};

=======
>>>>>>> upstream/master
export const queryJobTitles = /* GraphQL */ `
  query($key: String!) {
    job_titles(query: $key, page: 0) {
      name
    }
  }
`;

<<<<<<< HEAD
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
=======
export const getJobTitleTimeAndSalaryQuery = /* GraphQL */ `
>>>>>>> upstream/master
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
<<<<<<< HEAD
          ...salaryWorkTimeFields
=======
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
>>>>>>> upstream/master
        }
      }
    }
  }
<<<<<<< HEAD
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
export type JobTitleInterviewExperience = {};

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

export const queryJobTitleInterviewExperiencesGql = /* GraphQL */ `
=======
`;

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
>>>>>>> upstream/master
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

<<<<<<< HEAD
// TODO
export type JobTitleWorkExperience = {};

export type QueryJobTitleWorkExperiencesData = {
  job_title:
    | (JobTitle & {
        workExperiencesResult: {
          count: number;
          workExperiences: JobTitleWorkExperience[];
        };
      })
    | null;
};

=======
>>>>>>> upstream/master
export const getJobTitleWorkExperiencesQuery = /* GraphQL */ `
  query(
    $jobTitle: String!
    $companyName: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    job_title(name: $jobTitle) {
      name
      workExperiencesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        workExperiences {
          ${experiencePartialGql}
          ${workExperiencesPartialGql()}
        }
      }
    }
  }
`;

<<<<<<< HEAD
export type QueryJobTitlesHavingDataData = {
  jobTitlesHavingData: JobTitle[];
  jobTitlesHavingDataCount: number;
};

=======
>>>>>>> upstream/master
export const queryJobTitlesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    jobTitlesHavingData(start: $start, limit: $limit) {
      name
    }
    jobTitlesHavingDataCount
  }
`;
