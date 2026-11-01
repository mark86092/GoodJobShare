import fetchUtil from 'utils/fetchUtil';

// TODO: 待後端補上對應的 GraphQL mutation 後改用 graphqlClient
const createExperienceReply = ({
  id,
  comment,
  token,
}: {
  id: string;
  comment: string;
  token?: string;
}): Promise<unknown> =>
  fetchUtil(`/experiences/${id}/replies`).post({
    body: {
      content: comment,
    },
    token,
  });

export default createExperienceReply;
