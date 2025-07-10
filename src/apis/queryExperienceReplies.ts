import graphqlClient from 'utils/graphqlClient';
import { Reply } from 'apis/reply';

const queryExperienceRepliesGql = /* GraphQL */ `
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

// TODO: need check whether experience is not null
type QueryExperienceRepliesData = {
  experience: {
    replies: Reply[];
  };
};

const queryExperienceReplies = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<Reply[]> =>
  graphqlClient<QueryExperienceRepliesData>({
    query: queryExperienceRepliesGql,
    variables: { id },
    token,
  }).then(data => data.experience.replies);

export default queryExperienceReplies;
