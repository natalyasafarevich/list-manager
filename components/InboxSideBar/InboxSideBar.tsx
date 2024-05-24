'use client';
import {FC, useEffect, useState} from 'react';
import './InboxSideBar.scss';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import useResponsive from '@/hooks/useResponsive';

const InboxSideBar: FC = () => {
  const {isMobile} = useResponsive();

  const searchParams = useSearchParams();
  const [url, setUrl] = useState<string | null>('');
  const [inboxLinks, setInboxLink] = useState<Array<any>>([]);

  const {inbox, mergedMessages} = useSelector((state: RootState) => state.inbox);
  const {sentMessages, starredMessage, archivedMessage, deletedMessage, spamMessage} = inbox;
  const mainPhoto = useSelector((state: RootState) => state?.userdata?.additional_info?.mainPhoto);
  useEffect(() => {
    if (inbox || mergedMessages) {
      setInboxLink([
        {url: '?n=general', name: 'General', count: Object.keys(mergedMessages).length || 0},
        {url: '?n=sent', name: 'Sent', count: sentMessages ? Object.keys(sentMessages).length : 0},
        {url: '?n=starred', name: 'Starred', count: starredMessage ? Object.keys(starredMessage).length : 0},
        {url: '?n=archive', name: 'Archive', count: archivedMessage ? Object.keys(archivedMessage).length : 0},
        {url: '?n=delete', name: 'Delete', count: deletedMessage ? Object.keys(deletedMessage).length : 0},
        {url: '?n=spam', name: 'Spam', count: spamMessage ? Object.keys(spamMessage).length : 0},
      ]);
    }
  }, [inbox, mergedMessages]);

  useEffect(() => {
    setUrl(searchParams.get('n'));
  }, [searchParams]);
  return (
    <div className=' inbox-side-bar'>
      {isMobile && (
        <div className='inbox-side-bar__header'>
          <Link href={'/board'} className='inbox-side-bar__header-button button-back'></Link>
          <p className='inbox-side-bar__header-title'>Inbox</p>
          <div
            className='inbox-side-bar__header-user'
            style={{background: `center/cover no-repeat url(${mainPhoto?.url})`}}
          ></div>
        </div>
      )}
      <div className='inbox-side-bar__container'>
        {!isMobile && <p className='inbox-side-bar__title '>Inbox</p>}
        <div className='inbox-side-bar__column'>
          {inboxLinks.map((link, i) => (
            <Link
              href={link.url}
              data-count={link.count}
              className={` inbox-side-bar__link inbox-side-bar__link-${link.name.toLocaleLowerCase()} ${url === link.name.toLocaleLowerCase() ? 'active' : ''}`}
              key={i}
            >
              {!isMobile && link.name}
            </Link>
          ))}
        </div>
        {!isMobile && (
          <Link className=' inbox-side-bar__button' href={'/boards'}>
            <span className='button-back'></span> Return back
          </Link>
        )}
      </div>
    </div>
  );
};

export default InboxSideBar;
