'use client';
import {UpdateInRealTime} from '@/helper/UpdateInRealTime';
import {getInbox} from '@/store/inbox/actions';
import {RootState} from '@/store/store';
import {ReactNode, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export interface MessageProps {
  [id: string]: {
    messageText: string;
    read: boolean;
    senderId: string;
    status: string;
    time: string;
    recipientId: string;
    senderInfo: {
      name: string;
      photo: string;
      publicName: string;
    };
    title: string;
  };
}
export interface MessagesProps {
  sentMessages: MessageProps;
  archivedMessage: MessageProps;
  receivedMessages: MessageProps;
  deletedMessage: MessageProps;
  spamMessage: MessageProps;
  starredMessage: MessageProps;
}
const MessageStatusTracking = ({children}: {children: ReactNode}) => {
  const {uid} = useSelector((state: RootState) => state.userdata);
  const [messages, setMessages] = useState<MessagesProps | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    uid && UpdateInRealTime(`/users/${uid}/messages`, setMessages);
  }, [uid]);
  useEffect(() => {
    dispatch(getInbox(messages || ({} as MessagesProps)));
  }, [messages]);

  return <>{children} </>;
};

export default MessageStatusTracking;
