import React, { PropsWithChildren } from 'react';
<<<<<<< HEAD
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
=======
import { Route, StaticContext } from 'react-router';

interface AppStaticContext extends StaticContext {
  status?: number;
}

type Props = PropsWithChildren<{ status: number }>;

// Add http status code when SSR
const Status: React.FC<Props> = ({ status, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        (staticContext as AppStaticContext).status = status; // eslint-disable-line no-param-reassign
      }
      return <>{children}</>;
>>>>>>> rewrite-to-ts
    }}
  />
);

export default Status;
