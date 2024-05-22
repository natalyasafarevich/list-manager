import {MessagesProps} from '@/providers/MessageStatusTracking';

export const INBOX = 'inbox/INBOX';
export const MERGED_MESSAGES = 'inbox/MERGED_MESSAGES';

export type CurrentMessagesProps = {
  type: typeof INBOX;
  payload: MessagesProps;
};

export type ActionsType = CurrentMessagesProps | MergedMessagesProps;

export const getInbox = (data: MessagesProps) => {
  return {
    type: INBOX,
    payload: data,
  };
};

export type MergedMessagesProps = {
  type: typeof MERGED_MESSAGES;
  payload: any;
};

export const getMergedMessages = (data: any) => {
  return {
    type: MERGED_MESSAGES,
    payload: data,
  };
};
