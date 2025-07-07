export interface Reply {
  id: string;
  content: string;
  like_count: number;
  floor: number;
  created_at: string;
  liked: boolean | null;
}

export const createReplyLike = /* GraphQL */ `
  mutation($input: CreateReplyLikeInput!) {
    createReplyLike(input: $input) {
      replyLike {
        id
      }
    }
  }
`;

export const deleteReplyLike = /* GraphQL */ `
  mutation($input: DeleteReplyLikeInput!) {
    deleteReplyLike(input: $input) {
      deletedReplyId
    }
  }
`;
