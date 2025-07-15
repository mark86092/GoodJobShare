import React, { PropsWithChildren } from 'react';
import Status from './Status';

const NotFound: React.FC<PropsWithChildren<{ status: number }>> = ({
  status = 404,
  children,
}) => <Status status={status}>{children}</Status>;

export default NotFound;
