import { identity, ifElse, isNil } from 'ramda';

import { ExperienceTypename } from 'constants/experienceTypename';
import {
  changeExperienceStatusGql,
  createExperienceLikeGql,
  deleteExpereinceLikeGql,
  queryExperienceGql,
  queryExperienceLikeGql,
  queryExperienceRepliesGql,
  queryRelatedExperiencesGql,
} from 'graphql/experience';
import { getPopularExperiencesQuery } from 'graphql/popularExperience';
import { createReplyLike, deleteReplyLike } from 'graphql/reply';
import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';

export const queryExperienceReplies = async ({ id, token }) =>
  graphqlClient({
    query: queryExperienceRepliesGql,
    variables: { id },
    token,
  }).then(data => data.experience.replies);

export const postExperienceReply = ({ id, comment, token }) =>
  fetchUtil(`/experiences/${id}/replies`).post({
    body: {
      content: comment,
    },
    token,
  });

export const deleteExperienceLikesApi = ({ id, token }) =>
  graphqlClient({
    query: deleteExpereinceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  });

export const createExperienceLikeApi = ({ id, token }) =>
  graphqlClient({
    query: createExperienceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  });

export const deleteReplyLikes = ({ id, token }) =>
  graphqlClient({
    query: deleteReplyLike,
    variables: { input: { reply_id: id } },
    token,
  });

export const postReplyLikes = ({ id, token }) =>
  graphqlClient({
    query: createReplyLike,
    variables: { input: { reply_id: id } },
    token,
  });

export const patchReply = ({ id, status, token }) =>
  fetchUtil(`/replies/${id}`).patch({
    body: {
      status,
    },
    token,
  });

const resolveSubtitleInSection = ({
  __typename,
  interview_subtitle,
  work_subtitle,
  intern_subtitle,
}) => {
  switch (__typename) {
    case ExperienceTypename.INTERVIEW_EXPERIENCE:
      return interview_subtitle;
    case ExperienceTypename.WORK_EXPERIENCE:
      return work_subtitle;
    case ExperienceTypename.INTERN_EXPERIENCE:
      return intern_subtitle;
    default:
      return null;
  }
};

// __typename is deliberately kept on the returned experience: it is the
// discriminant consumers use to tell the Experience implementations apart.
//
// `sections` is not on the Experience interface — it only arrives through the
// per-implementation inline fragments. Default it so that an implementation we
// have not written a fragment for yet degrades to an empty list instead of
// throwing during SSR.
const resolveSubtitlesInExperience = experience => {
  const { __typename, sections = [] } = experience;
  return {
    ...experience,
    sections: sections.map(
      ({ interview_subtitle, work_subtitle, intern_subtitle, ...rest }) => ({
        ...rest,
        subtitle: resolveSubtitleInSection({
          __typename,
          interview_subtitle,
          work_subtitle,
          intern_subtitle,
        }),
      }),
    ),
  };
};

export const queryExperience = ({ id }) =>
  graphqlClient({
    query: queryExperienceGql,
    variables: { id },
  })
    .then(data => data.experience)
    .then(ifElse(isNil, identity, resolveSubtitlesInExperience));

export const queryExperienceLike = async ({ id, token }) => {
  const data = await graphqlClient({
    query: queryExperienceLikeGql,
    variables: { id },
    token,
  });

  return data.experience.liked;
};

export const getPopularExperiences = () =>
  graphqlClient({
    query: getPopularExperiencesQuery,
  }).then(data => data.popular_experiences);

export const changeExperienceStatus = ({ id, status, token }) =>
  graphqlClient({
    query: changeExperienceStatusGql,
    variables: { input: { id, status } },
    token,
  });

export const queryRelatedExperiences = async ({ id, start, limit }) => {
  const data = await graphqlClient({
    query: queryRelatedExperiencesGql,
    variables: { id, start, limit },
  });
  const relatedExperiences = data.experience.relatedExperiences;
  return relatedExperiences.map(resolveSubtitlesInExperience);
};
