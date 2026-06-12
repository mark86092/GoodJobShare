import qs from 'qs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearch = () => {
  const location = useLocation();
  return location.search;
};

export const useQuery = () => {
  const search = useSearch();
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
};
