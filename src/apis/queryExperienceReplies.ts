import graphqlClient from 'utils/graphqlClient';
import { Reply } from 'types/reply';

const query = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      replies {
        id
        content
        like_count
        floor
        created_at
        liked
      }
    }
  }
`;

const queryExperienceReplies = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<Reply[]> =>
  graphqlClient<{
    experience: {
      replies: Reply[];
    };
  }>({
    query,
    variables: { id },
    token,
  }).then(data => data.experience.replies);

export default queryExperienceReplies;
