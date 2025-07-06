import graphqlClient from 'utils/graphqlClient';

const query = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

const queryExperienceLike = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<boolean | null> => {
  const data = await graphqlClient<{
    experience: {
      liked: boolean | null;
    };
  }>({
    query,
    variables: { id },
    token,
  });

  return data.experience.liked;
};

export default queryExperienceLike;
