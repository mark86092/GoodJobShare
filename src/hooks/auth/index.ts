import { useSelector } from 'react-redux';
import {
  statusSelector,
  userSelector,
  tokenSelector,
<<<<<<< HEAD
  getUserEmailStatus,
} from 'selectors/authSelector';
import { User } from 'reducers/auth';
import AUTH_STATUS from 'constants/authStatus';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AUTH_STATUS.CONNECTED;
};
export const useAuthUser = (): User | undefined => useSelector(userSelector);
export const useAuthUserEmailStatus = () => useSelector(getUserEmailStatus);
=======
} from 'selectors/authSelector';
import AuthStatus from 'constants/authStatus';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AuthStatus.CONNECTED;
};
export const useAuthUser = () => useSelector(userSelector);
>>>>>>> upstream/master
export const useToken = () => useSelector(tokenSelector);
