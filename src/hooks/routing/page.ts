import { useMemo } from 'react';
<<<<<<< HEAD:src/hooks/routing/page.js

import { useQuery } from 'hooks/routing';
import { pageFromQuerySelector } from 'selectors/routing';
=======
>>>>>>> upstream/master:src/hooks/routing/page.ts

import { useQuery } from 'hooks/routing';
import { pageFromQuerySelector } from 'selectors/routing';

export const usePage = (): number => {
  // page from ?p=xxx
  const query = useQuery();
  return useMemo(() => pageFromQuerySelector(query), [query]);
};
