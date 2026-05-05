import createReducer from 'utils/createReducer';
import { SET_LOGIN, SET_USER } from 'actions/auth';

import AuthStatus from 'constants/authStatus';

export type User = {
  _id: string;
  name: string;
<<<<<<< HEAD
  email: string;
  email_status: unknown;
=======
  email: string | null;
>>>>>>> upstream/master
};

const preloadedState: {
  status: AuthStatus;
  token?: string;
  user?: User;
} = {
  status: AuthStatus.UNKNOWN,
  token: undefined,
  user: undefined,
};

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (
    state,
    { status, token }: { status: AuthStatus; token?: string },
  ) => ({ ...state, status, token }),
<<<<<<< HEAD
  [SET_USER]: (state, { user }: { user: User | undefined }) => ({
=======
  [SET_USER]: (state, { user }: { user?: User }) => ({
>>>>>>> upstream/master
    ...state,
    user,
  }),
});

export default auth;
