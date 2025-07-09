import DataResultSortOption from 'apis/dataResultSortOption';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from './experience';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
  SalaryWorkTimeStatistics,
} from 'apis/salaryWorkTime';

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
        }
      }
    }
  }
  ${fragmentSalaryWorkTimeFields}
`;

export type JobTitleSalaryWorkTimeStatistics = JobTitle & {
  salary_work_time_statistics: SalaryWorkTimeStatistics;
};

export type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: JobTitleSalaryWorkTimeStatistics | null;
};

export const queryJobTitleSalaryWorkTimeStatisticsQuery = /* GraphQL */ `
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

export const queryJobTitleWorkExperiencesGql = /* GraphQL */ `
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
