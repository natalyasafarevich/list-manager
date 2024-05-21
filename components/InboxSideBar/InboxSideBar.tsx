'use client';
import {FC, useEffect, useState} from 'react';
import './InboxSideBar.scss';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
const inboxLinks = [
  {url: '?n=general', name: 'General', count: 999},
  {url: '?n=sent', name: 'Sent', count: 451},
  {url: '?n=starred', name: 'Starred', count: 99},
  {url: '?n=archive', name: 'Archive', count: 25},
];
const InboxSideBar: FC = () => {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState<string | null>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUrl(searchParams.get('n'));
  }, [searchParams]);
  return (
    <div className=' inbox-side-bar'>
      <div className='inbox-side-bar__container'>
        <p className='inbox-side-bar__title '>Inbox</p>
        <div className='inbox-side-bar__column'>
          {inboxLinks.map((link, i) => (
            <Link
              href={link.url}
              data-count={link.count}
              className={` inbox-side-bar__link inbox-side-bar__link-${link.name.toLocaleLowerCase()} ${url === link.name.toLocaleLowerCase() ? 'active' : ''}`}
              key={i}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link className=' inbox-side-bar__button' href={'/boards'}>
          <span className='button-back'></span> Return back
        </Link>
      </div>
    </div>
  );
};

export default InboxSideBar;
