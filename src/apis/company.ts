import DataResultSortOption from 'apis/dataResultSortOption';

export interface Company {
  name: string;
}

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};
