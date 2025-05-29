import { path } from 'ramda';
import { RootState } from 'reducers';
import { User } from 'reducers/auth';

import AUTH_STATUS from 'constants/authStatus';

export const statusSelector = (state: RootState): AUTH_STATUS =>
  state.auth.status;
export const tokenSelector = (state: RootState): string | undefined =>
  state.auth.token;
export const userSelector = (state: RootState): User | undefined =>
  state.auth.user;
export const getUserName = path(['auth', 'user', 'name']);
export const getUserEmail = path(['auth', 'user', 'email']);
export const getUserEmailStatus = path(['auth', 'user', 'email_status']);
