import DataResultSortOption from './dataResultSortOption';
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

export interface Company {
  name: string;
}

export type QueryCompanySalaryWorkTimeData = {
  company:
    | (Company & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
      })
    | null;
};

export const getCompanyTimeAndSalaryQuery = /* GraphQL */ `
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

export type CompanySalaryWorkTimeStatistics = Company & {
  salary_work_time_statistics: SalaryWorkTimeStatistics;
};

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

export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

export type QueryCompanyTopNJobTitlesData = {
  company: (Company & { topNJobTitles: TopNJobTitles }) | null;
};

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

type AvgSalaryStatistics = {
  year: number;
  average: number;
  sameIndustryAverage: number;
};

type MedianSalaryStatistics = {
  year: number;
  median: number;
};

type FemaleManagerStatistics = {
  year: number;
  percentage: number;
};

export type ESGSalaryData = {
  avgSalaryStatistics: AvgSalaryStatistics[];
  nonManagerAvgSalaryStatistics: AvgSalaryStatistics[];
  nonManagerMedianSalaryStatistics: MedianSalaryStatistics[];
  femaleManagerStatistics: FemaleManagerStatistics[];
};

export type QueryCompanyEsgSalaryDataData = {
  company: {
    esgSalaryData: ESGSalaryData | null;
  } | null;
};

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

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};

// TODO
export type CompanyInterviewExperience = {};

export type QueryCompanyInterviewExperiencesData = {
  company:
    | (Company & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: CompanyInterviewExperience[];
        };
      })
    | null;
};

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

// TODO
export type CompanyWorkExperience = {};

export type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: CompanyWorkExperience[];
        };
      })
    | null;
};

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

export type CompanyInIndex = Company & {
  businessNumber: string | null;
  dataCount: number;
};

export type QueryCompaniesHavingDataData = {
  companiesHavingData: CompanyInIndex[];
  companiesHavingDataCount: number;
};

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

export type SubscribeCompanyData = { subscribeCompany: { success: boolean } };

export const subscribeCompanyGql = /* GraphQL */ `
  mutation SubscribeCompany($input: SubscribeCompanyInput!) {
    subscribeCompany(input: $input) {
      success
    }
  }
`;

export type UnsubscribeCompanyData = {
  unsubscribeCompany: { success: boolean };
};

export const unsubscribeCompanyGql = /* GraphQL */ `
  mutation UnsubscribeCompany($input: UnsubscribeCompanyInput!) {
    unsubscribeCompany(input: $input) {
      success
    }
  }
`;
