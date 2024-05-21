'use client';
import firebaseApp from '@/firebase';
import {UpdateInRealTime} from '@/helper/UpdateInRealTime';
import {fetchBackData} from '@/helper/getFirebaseData';
import {RootState} from '@/store/store';
import {getDatabase, onValue, ref} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import InboxSideBar from '../InboxSideBar/InboxSideBar';
import InboxList from './InboxList/InboxList';
import './Inbox.scss';
import InboxViewer from './InboxViewer/InboxViewer';
import PopupMessage from '../PopupMessage/PopupMessage';

interface MessagesProps {
  sentMessages: {
    [id: string]: {
      messageText: string;
      read: boolean;
      senderId: string;
      status: string;
      time: string;
    };
  };
  receivedMessages: {
    [id: string]: {
      messageText: string;
      read: boolean;
      senderId: string;
      status: string;
      time: string;
    };
  };
}

const Inbox: FC = () => {
  const [messageId, setMessageId] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  return (
    <div className='inbox'>
      <div className='inbox__container'>
        {isArchived && <PopupMessage title='f' messageType='successes' />}
        <div className='inbox__row flex'>
          <div className='inbox__box'>
            <div className='inbox__header'>
              <p className='inbox__title'>Inbox</p>
              <p className='inbox__desc'>2445 messages, 2 Unread</p>
              <div className='inbox__flex flex'>
                <div className='inbox__search'></div>
                <div className='inbox__new-message'></div>
              </div>
            </div>
            <InboxList getMessageId={(e) => setMessageId(e)} />
          </div>
          {messageId && (
            <InboxViewer
              isArchived={(e) => {
                setIsArchived(e);
              }}
              messageId={messageId}
            />
          )}
        </div>

        {/* <InboxSideBar /> */}
        {/* <div className='inbox__title'>
          Отправленные:
          <div className='inbox__'>
            {messages?.sentMessages &&
              Object.keys(messages?.sentMessages).map((messageId) => (
                <div key={messageId} className='message'>
                  <p>{messages.sentMessages[messageId].messageText}</p>
                  <p>{messages.sentMessages[messageId].time}</p>
                </div>
              ))}
            <b> Новые:</b>
            {messages?.receivedMessages &&
              Object.keys(messages?.receivedMessages).map((messageId) => (
                <div key={messageId} className='message'>
                  <p>{messages.receivedMessages[messageId].messageText}</p>
                  <p>{messages.receivedMessages[messageId].time}</p>
                  <p>{messages.receivedMessages[messageId].senderId}</p>
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Inbox;
