import { useAsyncFn } from 'react-use';
<<<<<<< HEAD:src/components/ExperienceDetail/hooks/useQueryReplies.ts
import { AsyncFn } from 'react-use/lib/useAsyncFn';
=======

import { queryExperienceReplies } from 'apis/experiencesApi';
import { useToken } from 'hooks/auth';
>>>>>>> upstream/master:src/components/ExperienceDetail/hooks/useQueryReplies.js

import queryExperienceReplies from 'apis/queryExperienceReplies';
import { Reply } from 'apis/reply';
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
