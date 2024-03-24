import {CommentProps} from '@/components/CurrentBoard/Card/CardSettings/CardSettings';

export const IS_CARD_SETTING_OPEN = 'card-setting/IS_CARD_SETTING_OPEN';
export const COMMENTS = 'card-setting/COMMENTS';
export const IS_CREATE_CARD = 'card-setting/IS_CREATE_CARD';
export const IS_DESCRIPTION_ADDED = 'card-setting/IS_DESCRIPTION_ADDED';

export type PayloadProps = {
  isOpen: boolean;
};

export type DataCardProps = {
  type: typeof IS_CARD_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType =
  | DataCardProps
  | DataCommentProps
  | IsCardCreateProps
  | IsDescriptionAddedProps;

export const getIsOpenCardSetting = (data: PayloadProps) => {
  return {
    type: IS_CARD_SETTING_OPEN,
    payload: data,
  };
};

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

type CardProps = {
  isCardCreate: boolean;
};
export type IsCardCreateProps = {
  type: typeof IS_CREATE_CARD;
  payload: CardProps;
};

export const isCardCreate = (data: CardProps) => {
  return {
    type: IS_CREATE_CARD,
    payload: data,
  };
};

export type IsDescriptionAddedProps = {
  type: typeof IS_DESCRIPTION_ADDED;
  payload: boolean;
};

export const isDescriptionAdded = (data: boolean) => {
  return {
    type: IS_DESCRIPTION_ADDED,
    payload: data,
  };
};
