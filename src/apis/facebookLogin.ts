import { User } from 'reducers/auth';
import graphqlClient from 'utils/graphqlClient';

const facebookLoginGql = /* GraphQL */ `
  mutation($input: FacebookLoginInput!) {
    facebookLogin(input: $input) {
      user {
        _id
        facebook_id
      }
      token
    }
  }
`;

type MutationFacebookLoginData = {
  facebookLogin: {
    token: string;
    user: User;
  };
};

const facebookLogin = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<MutationFacebookLoginData['facebookLogin']> =>
  graphqlClient<MutationFacebookLoginData>({
    query: facebookLoginGql,
    variables: {
      input: {
        accessToken,
      },
    },
  }).then(({ facebookLogin }) => facebookLogin);

export default facebookLogin;
