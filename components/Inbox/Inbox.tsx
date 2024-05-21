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
  return (
    <div className='inbox'>
      <div className='inbox__container'>
        <div className='inbox__row'>
          <div className='inbox__box'>
            <p className='inbox__title'>Inbox</p>
            <p className='inbox__desc'>2445 messages, 2 Unread</p>
            <div className='inbox__row'>
              <div className='inbox__search'></div>
              <div className='inbox__new-message'></div>
            </div>
            <InboxList />
          </div>
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
