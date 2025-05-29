import graphqlClient from 'utils/graphqlClient';
import { facebookLogin, googleLogin } from 'graphql/auth';

type LoginResponse = {
  token: string;
};

export const postAuthFacebook = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<LoginResponse> =>
  graphqlClient<{ facebookLogin: LoginResponse }>({
    query: facebookLogin,
    variables: {
      input: {
        accessToken,
      },
    },
  }).then(({ facebookLogin }) => facebookLogin);

export const postAuthGoogle = ({
  idToken,
}: {
  idToken: string;
}): Promise<LoginResponse> =>
  graphqlClient<{ googleLogin: LoginResponse }>({
    query: googleLogin,
    variables: {
      input: {
        idToken,
      },
    },
  }).then(({ googleLogin }) => googleLogin);
