import { createContext } from 'react';

const setLoginModalDisplayed: (isDisplayed: boolean) => void = () => {
  // do nothing.
};

export default createContext({
  isLoginModalDisplayed: false,
  setLoginModalDisplayed,
});
