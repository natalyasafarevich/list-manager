import {CommentProps} from '@/components/CurrentBoard/Card/CardSettings/CardSettings';

export const IS_CARD_SETTING_OPEN = 'card-setting/IS_CARD_SETTING_OPEN';
export const COMMENTS = 'card-setting/COMMENTS';

export type PayloadProps = {
  isOpen: boolean;
};

export type DataCardProps = {
  type: typeof IS_CARD_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType = DataCardProps | DataCommentProps;

export const getIsOpenCardSetting = (data: PayloadProps) => {
  return {
    type: IS_CARD_SETTING_OPEN,
    payload: data,
  };
};

// export type PayloadCommentProps = {
//   isOpen: boolean;
// };

export type DataCommentProps = {
  type: typeof COMMENTS;
  payload: Array<CommentProps>;
};

export const getComments = (data: Array<CommentProps>) => {
  return {
    type: COMMENTS,
    payload: data,
  };
};
