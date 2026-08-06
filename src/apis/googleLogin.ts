import { User } from 'reducers/auth';
import graphqlClient from 'utils/graphqlClient';

const googleLoginGql = /* GraphQL */ `
  mutation($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      user {
        _id
        google_id
      }
      token
    }
  }
`;

type MutationGoogleLoginData = {
  googleLogin: {
    token: string;
    user: User;
  };
};

const googleLogin = ({
  idToken,
}: {
  idToken: string;
}): Promise<MutationGoogleLoginData['googleLogin']> =>
  graphqlClient<MutationGoogleLoginData>({
    query: googleLoginGql,
    variables: {
      input: {
        idToken,
      },
    },
  }).then(({ googleLogin }) => googleLogin);

export default googleLogin;
