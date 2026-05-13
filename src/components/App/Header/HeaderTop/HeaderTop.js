import React from 'react';
import { useLocation } from 'react-router-dom';
import useShareLink from 'hooks/experiments/useShareLink';
import { useIsLoggedIn } from 'hooks/auth';

import Top from './Top';
import ProgressContent from './ProgressContent';

const HeaderTop = () => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();
  const shareLink = useShareLink();

  if (!isLoggedIn && location.pathname === '/') {
    return null;
  }

  return (
    <Top to={shareLink}>
      <ProgressContent />
    </Top>
  );
};

export default HeaderTop;
