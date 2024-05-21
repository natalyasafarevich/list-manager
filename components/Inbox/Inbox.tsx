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
  useEffect(() => {
    isArchived &&
      setTimeout(() => {
        setIsArchived(false);
      }, 2000);
  }, [isArchived]);
  return (
    <div className='inbox'>
      <div className='inbox__container'>
        {isArchived && (
          <PopupMessage title={'Success '} message='The message was successfully transferred' messageType={'success'} />
        )}
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
          <div className='inbox__viewer'>
            {messageId && (
              <InboxViewer
                isArchived={(e) => {
                  setIsArchived(e);
                }}
                messageId={messageId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
