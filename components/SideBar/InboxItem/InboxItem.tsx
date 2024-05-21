'use client';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import SubMenu from '../SubMenu/SubMenu';
import {useUrl} from 'nextjs-current-url';
import SideBarItem from '../SideBarItem/SideBarItem';
import './InboxItem.scss';
import {useSearchParams} from 'next/navigation';

const inboxLinks = [
  {url: '?n=general', name: 'General'},
  {url: '?n=sent', name: 'Sent'},
  {url: '?n=starred', name: 'Starred'},
  {url: '?n=archive', name: 'Archive'},
];

interface InboxItemProps {
  handleSetActiveLink: (value: string) => void;
  activeLink: string;
}
const InboxItem: FC<InboxItemProps> = ({handleSetActiveLink, activeLink}) => {
  // const searchParams = useSearchParams();
  // const [url, setUrl] = useState<string | null>('');
  // const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setUrl(searchParams.get('n'));
  // }, [searchParams]);

  return (
    <ul className='inbox-item'>
      <li className='side-bar__link inbox-item__link '>
        <Link
          href='/inbox?n=general'
          onClick={() => {
            handleSetActiveLink('inbox');
            // setIsOpen(!isOpen);
          }}
          className={activeLink === 'inbox' ? 'side-bar__link active' : 'side-bar__link'}
        >
          <span>Inbox</span>
        </Link>
      </li>
      {/* {isOpen && (
        <li>
          <SubMenu>
            {inboxLinks.map((link, key) => (
              <SideBarItem
                onClick={() => handleSetActiveLink('inbox')}
                key={key}
                href={link.url}
                className={`inbox-item__box ${url === link.name.toLocaleLowerCase() ? 'active' : ''}`}
              >
                {link.name}
              </SideBarItem>
            ))}
          </SubMenu>
        </li>
      )} */}
    </ul>
  );
};

export default InboxItem;
