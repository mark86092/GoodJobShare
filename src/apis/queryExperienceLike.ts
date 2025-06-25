import graphqlClient from 'utils/graphqlClient';
const query = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

type Data = {
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
  const data = await graphqlClient<Data>({
    query,
    variables: { id },
    token,
  });

  return data.experience.liked;
};

export default queryExperienceLike;
