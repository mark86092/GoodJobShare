import { useCallback } from 'react';

import createExperienceReply from 'apis/createExperienceReply';
import { useToken } from 'hooks/auth';

const useCreateReply = (
  experienceId: string,
): ((comment: string) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (comment: string) =>
      createExperienceReply({ id: experienceId, comment, token }),
    [experienceId, token],
  );
};

export default useCreateReply;
