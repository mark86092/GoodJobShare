import { useSelector } from 'react-redux';
import {
  statusSelector,
  userSelector,
  tokenSelector,
  getUserEmailStatus,
} from 'selectors/authSelector';
import AUTH_STATUS from 'constants/authStatus';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AUTH_STATUS.CONNECTED;
};
export const useAuthUser = () => useSelector(userSelector);
export const useAuthUserEmailStatus = () => useSelector(getUserEmailStatus);
export const useToken = () => useSelector(tokenSelector);
