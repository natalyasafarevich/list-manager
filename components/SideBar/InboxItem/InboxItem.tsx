'use client';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import './InboxItem.scss';

interface InboxItemProps {
  handleSetActiveLink: (value: string) => void;
  activeLink: string;
}
const InboxItem: FC<InboxItemProps> = ({handleSetActiveLink, activeLink}) => {
  const [newMessages, setNewMessages] = useState('');
  const {inbox} = useSelector((state: RootState) => state.inbox);

  useEffect(() => {
    let countUnreadMessages = 0;

    for (let message in inbox?.receivedMessages) {
      if (!inbox?.receivedMessages[message].read) {
        countUnreadMessages++;
      }
    }
    setNewMessages(`${countUnreadMessages}`);
  }, [inbox]);
  return (
    <ul className='inbox-item'>
      <li
        className={`side-bar__link inbox-item__link ${+newMessages !== 0 ? 'new-messages' : ''}  `}
        data-count={`+${newMessages}`}
      >
        <Link
          href='/inbox?n=general'
          onClick={() => {
            handleSetActiveLink('inbox');
          }}
          className={activeLink === 'inbox' ? 'side-bar__link active' : 'side-bar__link'}
        >
          <span>Inbox</span>
        </Link>
      </li>
    </ul>
  );
};

export default InboxItem;
