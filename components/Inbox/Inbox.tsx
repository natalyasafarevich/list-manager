'use client';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import InboxList from './InboxList/InboxList';
import InboxViewer from './InboxViewer/InboxViewer';
import PopupMessage from '../PopupMessage/PopupMessage';
import NewMessage from '../NewMessage/NewMessage';
import 'firebase/database';
import './Inbox.scss';
import useResponsive from '@/hooks/useResponsive';
import useScrollControl from '@/hooks/useScrollControl';
import {useDispatch} from 'react-redux';
import {toggleMenu} from '@/store/menu/actions';

const Inbox: FC = () => {
  useScrollControl();
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [countedMessages, setCountedMessages] = useState({
    all: '',
    count: '',
  });

  const {inbox} = useSelector((state: RootState) => state.inbox);
  const {isMobile} = useResponsive();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (messageId) {
      setIsOpenMessage(true);
    }
  }, [messageId]);
  useEffect(() => {
    if (inbox.receivedMessages) {
      setCountedMessages((prev: any) => ({...prev, all: Object.keys(inbox?.receivedMessages).length}));
      let countUnreadMessages = 0;

      for (let message in inbox?.receivedMessages) {
        if (!inbox?.receivedMessages[message].read) {
          countUnreadMessages++;
        }
      }
      setCountedMessages((prev: any) => ({...prev, count: countUnreadMessages}));
    }
  }, [inbox?.receivedMessages]);

  useEffect(() => {
    isArchived &&
      setTimeout(() => {
        setIsArchived(false);
      }, 2000);
  }, [isArchived]);

  const [isOpenMessage, setIsOpenMessage] = useState(false);

  return (
    <div className='inbox'>
      {isNewMessage && (
        <div className='inbox__form'>
          <NewMessage setIsIOpen={(e) => setIsNewMessage(e)} />
        </div>
      )}
      <div className='inbox__container'>
        {isArchived && (
          <PopupMessage title={'Success '} message='The message was successfully transferred' messageType={'success'} />
        )}
        <div className='inbox__row flex'>
          <div className='inbox__box'>
            <div className='inbox__header'>
              <p className='inbox__title flex'>
                {!isMobile && ' Inbox'}
                <button
                  className='inbox__new-message'
                  onClick={(_e) => {
                    setIsNewMessage(true);
                    dispatch(toggleMenu(!isNewMessage));
                  }}
                ></button>
              </p>

              <p className='inbox__desc'>
                {countedMessages.all || 0} messages, {countedMessages.count || 0} Unread
              </p>
            </div>
            <InboxList getMessageId={(e) => setMessageId(e)} />
          </div>
          <div className={`inbox__viewer ${isOpenMessage ? 'open' : ''}`}>
            {messageId && (
              <InboxViewer
                isArchived={(e) => {
                  setIsArchived(e);
                }}
                isOpen={(e) => setIsOpenMessage(e)}
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
