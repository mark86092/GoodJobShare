import graphqlClient from 'utils/graphqlClient';

const createUserFeedbackGql = /* GraphQL */ `
  mutation CreateUserFeedback($input: CreateUserFeedbackInput!) {
    createUserFeedback(input: $input) {
      npsScore
      content
    }
  }
`;

type CreateUserFeedbackData = {
  createUserFeedback: { npsScore: number; content: string | null };
};

const createUserFeedback = ({
  npsScore,
  content,
  token,
}: {
  npsScore: number;
  content?: string | null;
  token?: string;
}): Promise<CreateUserFeedbackData['createUserFeedback']> =>
  graphqlClient<CreateUserFeedbackData>({
    query: createUserFeedbackGql,
    variables: { input: { content, npsScore } },
    token,
  }).then(data => data.createUserFeedback);

export default createUserFeedback;
