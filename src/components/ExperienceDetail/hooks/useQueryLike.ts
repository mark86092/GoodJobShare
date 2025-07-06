import { useAsyncFn } from 'react-use';
import { AsyncFn } from 'react-use/lib/useAsyncFn';
import { useToken } from 'hooks/auth';
import queryExperienceLike from 'apis/queryExperienceLike';

const useQueryLike = (experienceId: string): AsyncFn<boolean | null> => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLike({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLike;
