<<<<<<< HEAD:src/hooks/routing/index.js
import qs from 'qs';
=======
import qs, { ParsedQs } from 'qs';
>>>>>>> upstream/master:src/hooks/routing/index.ts
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearch = (): string => {
  const location = useLocation();
  return location.search;
};

export const useQuery = (): ParsedQs => {
  const search = useSearch();
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
};
