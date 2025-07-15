import React, { PropsWithChildren } from 'react';
import { Route } from 'react-router-dom';

// Add http status code when SSR
const Status: React.FC<PropsWithChildren<{ status: number }>> = ({
  status,
  children,
}) => (
  // @ts-ignore due to react router has bug in type
  <Route
    // @ts-ignore due to react router has bug in type
    render={({ staticContext }) => {
      if (staticContext) {
        // @ts-ignore
        staticContext.status = status; // eslint-disable-line no-param-reassign
      }
      return children;
    }}
  />
);

export default Status;
