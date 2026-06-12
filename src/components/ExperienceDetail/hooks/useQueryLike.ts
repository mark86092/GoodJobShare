import { useAsyncFn } from 'react-use';
<<<<<<< HEAD:src/components/ExperienceDetail/hooks/useQueryLike.ts
import { AsyncFn } from 'react-use/lib/useAsyncFn';
=======

import { queryExperienceLike } from 'apis/experiencesApi';
import { useToken } from 'hooks/auth';
>>>>>>> upstream/master:src/components/ExperienceDetail/hooks/useQueryLike.js

import queryExperienceLike from 'apis/queryExperienceLike';
import { useToken } from 'hooks/auth';

const useQueryLike = (experienceId: string): AsyncFn<boolean | null> => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLike({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLike;
