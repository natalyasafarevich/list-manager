import {MessagesProps} from '@/providers/MessageStatusTracking';

export const INBOX = 'inbox/INBOX';

export type CurrentMessagesProps = {
  type: typeof INBOX;
  payload: MessagesProps;
};

export type ActionsType = CurrentMessagesProps;

export const getInbox = (data: MessagesProps) => {
  return {
    type: INBOX,
    payload: data,
  };
};
