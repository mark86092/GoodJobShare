import DataResultSortOption from 'apis/dataResultSortOption';

export type CompanyExperiencesPaginationInput = {
  companyName: string;
  jobTitle?: string | null;
  start: number;
  limit: number;
  sortBy?: DataResultSortOption;
};
