import { useAsyncFn } from 'react-use';
import { AsyncFn } from 'react-use/lib/useAsyncFn';
import { useToken } from 'hooks/auth';
import queryExperienceReplies from 'apis/queryExperienceReplies';
import { Reply } from 'graphql/reply';

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
