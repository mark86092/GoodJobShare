export interface Company {
  name: string;
}

export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

export type QueryCompanyTopNJobTitlesData = {
  company: (Company & { topNJobTitles: TopNJobTitles }) | null;
};

export const queryCompanyTopNJobTitlesGql = /* GraphQL */ `
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
