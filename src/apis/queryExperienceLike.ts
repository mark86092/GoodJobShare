import graphqlClient from 'utils/graphqlClient';

const queryExperienceLikeGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

// TODO: need check whether experience is not null
type QueryExperienceLikeData = {
  experience: {
    liked: boolean | null;
  };
};

const queryExperienceLike = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<boolean | null> => {
  const data = await graphqlClient<QueryExperienceLikeData>({
    query: queryExperienceLikeGql,
    variables: { id },
    token,
  });

  return data.experience.liked;
};

export default queryExperienceLike;
