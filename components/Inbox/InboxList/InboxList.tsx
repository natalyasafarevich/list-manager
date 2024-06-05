'use client';
import {FC, useEffect, useState} from 'react';
import './InboxList.scss';
import {MessagesProps} from '@/providers/MessageStatusTracking';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch} from 'react-redux';
import {getMergedMessages} from '@/store/inbox/actions';
import InboxListItem from './Item/Item';
import {updateUserData} from '@/helper/updateUserData';
import {useSearchParams} from 'next/navigation';
import useResponsive from '@/hooks/useResponsive';

interface InboxListProps {
  getMessageId: (v: string) => void;
}

const InboxList: FC<InboxListProps> = ({getMessageId}) => {
  const [messages, setMessages] = useState<MessagesProps | null>(null);
  const [mergedMessages, setMergedMessages] = useState<Record<string, any>>({});
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();

  const {uid} = useSelector((state: RootState) => state.userdata);
  const {inbox} = useSelector((state: RootState) => state.inbox);

  useEffect(() => {
    setMessages(inbox);
  }, [inbox]);

  useEffect(() => {
    if (messages && searchParams.get('n') === 'sent') {
      setMergedMessages(inbox.sentMessages);
      return;
    }
    if (messages && searchParams.get('n') === 'starred') {
      setMergedMessages(inbox.starredMessage);
      return;
    }
    if (messages && searchParams.get('n') === 'archive') {
      setMergedMessages(inbox.archivedMessage);
      return;
    }
    if (messages && searchParams.get('n') === 'delete') {
      setMergedMessages(inbox.deletedMessage);
      return;
    }
    if (messages && searchParams.get('n') === 'spam') {
      setMergedMessages(inbox.spamMessage);
      return;
    }
    if (messages) {
      const mergedMessages: Record<string, any> = {...messages?.receivedMessages, ...messages?.sentMessages};
      const messagesArray = Object.entries(mergedMessages).map(([id, message]: [string, any]) => ({id, ...message}));
      messagesArray.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      const sortedMessages = messagesArray.reduce((acc, {id, ...message}) => {
        acc[id] = message;
        return acc;
      }, {});
      dispatch(getMergedMessages(sortedMessages));
      setMergedMessages(sortedMessages);
    }
  }, [messages, searchParams]);

  const handleItemClick = (id: string, message: string) => {
    getMessageId(message);

    updateUserData(`${uid}/messages/receivedMessages/${message}`, {read: true});
    setActiveMessageId(id);
  };

  return (
    <div className='inbox-list'>
      <div className='inbox-list__container'>
        <div className='inbox-list__box'>
          {!mergedMessages && <p>You do not have any messages...</p>}
          {mergedMessages &&
            Object.keys(mergedMessages).map((message, i) => (
              <div
                key={i}
                className={`inbox-list__item ${activeMessageId === `${i}` ? 'active' : ''}`}
                onClick={() => handleItemClick(`${i}`, message)}
              >
                <InboxListItem message={mergedMessages[message]} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InboxList;
