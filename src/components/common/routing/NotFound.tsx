<<<<<<< HEAD
import React, { PropsWithChildren } from 'react';
import Status from './Status';

const NotFound: React.FC<PropsWithChildren<{ status: number }>> = ({
  status = 404,
  children,
}) => <Status status={status}>{children}</Status>;
=======
import React from 'react';
import Status from './Status';

type Props = {
  status?: number;
  children?: React.ReactNode;
};

const NotFound: React.FC<Props> = ({ status = 404, children }) => (
  <Status status={status}>{children}</Status>
);
>>>>>>> rewrite-to-ts

export default NotFound;
