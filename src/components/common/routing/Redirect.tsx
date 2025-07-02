import React from 'react';
import {
  Redirect as RouterRedirect,
  RedirectProps as RouterRedirectProps,
} from 'react-router-dom';
import Status from './Status';

type RedirectProps = RouterRedirectProps & { status?: number };

// Add http status code 301 when SSR
const Redirect: React.FC<RedirectProps> = ({ status = 301, ...props }) => (
  <Status status={status}>
    {/* @ts-ignore due to react router has bug in type */}
    <RouterRedirect {...props} />
  </Status>
);

export default Redirect;
