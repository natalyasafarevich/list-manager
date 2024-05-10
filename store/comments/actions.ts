export const COMMENT_OWNER = 'comments/COMMENT_OWNER';

export type ActionsType = CommentOwnerProps;

export type CommentOwnerProps = {
  type: typeof COMMENT_OWNER;
  payload: string;
};
export const getCommentOwner = (data: string) => {
  return {
    type: COMMENT_OWNER,
    payload: data,
  };
};
