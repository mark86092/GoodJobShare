import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from './experience';
import {
  fragmentInterviewExperienceFields,
  fragmentWorkExperienceFields,
  InterviewExperience,
  WorkExperience,
} from './overview';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
  SalaryWorkTimeStatistics,
} from './salaryWorkTime';

export type RatingStatistics = {
  averageRating: number;
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  ratingCount: number;
};

export type QueryCompanyRatingStatisticsData = {
  company: {
    name: string;
    companyRatingStatistics: RatingStatistics | null;
  } | null;
};

export const queryCompanyRatingStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      companyRatingStatistics {
        averageRating
        ratingDistribution {
          rating
          count
        }
        ratingCount
      }
    }
  }
`;

export type QueryCompanyOverviewData = {
  company: {
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
};

export const queryCompanyOverviewGql = /* GraphQL */ `
  query(
    $companyName: String!
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    company(name: $companyName) {
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

export const queryCompanyOverviewStatisticsQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      salary_work_time_statistics {
        average_week_work_time
        overtime_frequency_count {
          seldom
          sometimes
          usually
          almost_everyday
        }
        job_average_salaries {
          job_title {
            name
          }
          average_salary {
            type
            amount
          }
          data_count
        }
      }
    }
  }
`;

export const getCompanyTimeAndSalaryQuery = /* GraphQL */ `
  query($companyName: String!, $jobTitle: String, $start: Int!, $limit: Int!) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(jobTitle: $jobTitle, start: $start, limit: $limit) {
        count
        salaryWorkTimes {
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
`;

export type CompanySalaryWorkTimeStatistics = {
  name: string;
  salary_work_time_statistics: SalaryWorkTimeStatistics;
} | null;

export type QueryCompanySalaryWorkTimeStatisticsData = {
  company: CompanySalaryWorkTimeStatistics | null;
};

export const queryCompanySalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
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

export const getCompanyTopNJobTitlesQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      topNJobTitles {
        work {
          name
        }
        interview {
          name
        }
        salary {
          name
        }
        all {
          name
        }
      }
    }
  }
`;

export const getCompanyEsgSalaryDataQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      esgSalaryData {
        avgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerAvgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerMedianSalaryStatistics {
          year
          median
        }
        femaleManagerStatistics {
          year
          percentage
        }
      }
    }
  }
`;

export const getCompanyInterviewExperiencesQuery = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(
        jobTitle: $jobTitle
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

export const getCompanyWorkExperiencesQuery = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
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

export const queryCompaniesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    companiesHavingData(start: $start, limit: $limit) {
      name
      businessNumber
      dataCount
    }
    companiesHavingDataCount
  }
`;

export type QueryCompanyIsSubscribedData = {
  company: {
    id: string;
    isSubscribed: boolean;
  } | null;
};

export const queryCompanyIsSubscribedGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      id
      isSubscribed
    }
  }
`;

export const subscribeCompanyGql = /* GraphQL */ `
  mutation SubscribeCompany($input: SubscribeCompanyInput!) {
    subscribeCompany(input: $input) {
      success
    }
  }
`;

export const unsubscribeCompanyGql = /* GraphQL */ `
  mutation UnsubscribeCompany($input: UnsubscribeCompanyInput!) {
    unsubscribeCompany(input: $input) {
      success
    }
  }
`;
