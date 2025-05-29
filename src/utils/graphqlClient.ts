import 'isomorphic-fetch';

import { stringify } from 'qs';

import { HttpError } from 'utils/errors';

import { API_HOST } from '../config';
import { GraphqlError } from 'utils/errors';
import fetchUtil from './fetchUtil';

// const fetch = fetchUtil('/graphql');

type GraphqlClientArgs = {
  query: string;
  variables?: unknown;
  options?: unknown;
  token?: string;
};

const headerBuilder = token =>
  token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };



const graphqlClient = async <T>({
  variables,
  query,
  options,
  token,
}: GraphqlClientArgs): Promise<T> => {
  fetch.post('/graphql', { headers: headerBuilder(token) });

  const response = await fetch.post({
    body: { query, variables },
    token,
    options,
  });
  if (response.errors) {
    throw new GraphqlError(response.errors);
  }
  return response.data;
};

export default graphqlClient;
