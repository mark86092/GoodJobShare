import graphqlClient from 'utils/graphqlClient';

const createExperienceReportGql = /* GraphQL */ `
  mutation CreateExperienceReportGql($input: CreateExperienceReportInput!) {
    createExperienceReport(input: $input) {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;

type CreateExperienceReportData = {
  createExperienceReport: {
    id: string;
    reasonCategory: string;
    reason: string | null;
    createdAt: string;
  };
};

const createExperienceReport = async ({
  id,
  reasonCategory,
  reason,
  token,
}: {
  id: string;
  reasonCategory: string;
  reason: string;
  token?: string;
}): Promise<CreateExperienceReportData['createExperienceReport']> => {
  const data = await graphqlClient<CreateExperienceReportData>({
    query: createExperienceReportGql,
    variables: {
      input: {
        experienceId: id,
        reasonCategory,
        reason,
      },
    },
    token,
  });
  return data.createExperienceReport;
};

export default createExperienceReport;
