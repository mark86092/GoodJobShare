import graphqlClient from 'utils/graphqlClient';

const createSalaryWorkTimeReportGql = /* GraphQL */ `
  mutation CreateSalaryWorkTimeReportGql(
    $input: CreateSalaryWorkTimeReportInput!
  ) {
    createSalaryWorkTimeReport(input: $input) {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;

type CreateSalaryWorkTimeReportData = {
  createSalaryWorkTimeReport: {
    id: string;
    reasonCategory: string;
    reason: string | null;
    createdAt: string;
  };
};

const createSalaryWorkTimeReport = async ({
  id,
  reasonCategory,
  reason,
  token,
}: {
  id: string;
  reasonCategory: string;
  reason: string;
  token?: string;
}): Promise<CreateSalaryWorkTimeReportData['createSalaryWorkTimeReport']> => {
  const data = await graphqlClient<CreateSalaryWorkTimeReportData>({
    query: createSalaryWorkTimeReportGql,
    variables: {
      input: {
        salaryWorkTimeId: id,
        reasonCategory,
        reason,
      },
    },
    token,
  });
  return data.createSalaryWorkTimeReport;
};

export default createSalaryWorkTimeReport;
