import { useAsyncFn } from 'react-use';
import { AsyncFn } from 'react-use/lib/useAsyncFn';

import queryExperienceReplies, { Reply } from 'apis/queryExperienceReplies';
import { useToken } from 'hooks/auth';

const useQueryReplies = (experienceId: string): AsyncFn<Reply[]> => {
  const token = useToken();
  return useAsyncFn(
    () =>
      queryExperienceReplies({
        id: experienceId,
        token,
      }),
    [experienceId, token],
  );
};

export default useQueryReplies;
