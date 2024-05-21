'use client';
import {FC, useEffect, useState} from 'react';
import './SideBar.scss';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import SideBarItem from './SideBarItem/SideBarItem';
import SubMenu from './SubMenu/SubMenu';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import InboxItem from './InboxItem/InboxItem';
import InboxSideBar from '../InboxSideBar/InboxSideBar';
import {usePathname} from 'next/navigation';

const links = [
  {url: '/settings/profile', name: 'General settings'},
  {url: '/settings/contacts', name: 'Contacts'},
  {url: '/settings/security', name: 'Security'},
  {url: '/settings/delete-account', name: 'Delete account'},
];
// const inboxLinks = [
//   {url: '?=general', name: 'General'},
//   {url: '?=sent', name: 'Sent'},
//   {url: '?=starred', name: 'Starred'},
//   {url: '?=archive', name: 'Archive'},
// ];
interface NavLink {
  path: string;
  label: string;
  length?: number | null;
}
const SideBar: FC = () => {
  const [countBoard, setCountBoard] = useState<null | number>();
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    setActiveLink(pathname.substring(pathname.lastIndexOf('/') + 1));
  }, [pathname]);
  console.log(activeLink);
  // const board = useSelector((state: RootState) => state.boards.boards);
  const user = useSelector((state: RootState) => state.userdata);
  const {additional_info, uid} = user;
  // useEffect(() => {
  //   // board && setCountBoard(Object.keys(board).length);
  // }, [board]);

  useEffect(() => {
    setNavLinks([
      {path: '/boards', label: 'Boards', length: countBoard},
      // {path: '/inbox', label: 'Inbox'},
      {path: '/templates', label: 'Templates'},
    ]);
  }, [countBoard]);

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div className={`side-bar `}>
      <div className='side-bar__wrap'>
        <div className='side-bar__container'>
          <Link href={`/profile/${uid}`} className='side-bar__user'>
            <span className='side-bar__flex'>
              <span
                className='side-bar__img'
                style={{background: `center/cover no-repeat url(${additional_info?.mainPhoto?.url})`}}
              ></span>
              <span className='side-bar__name'>{additional_info?.fullName}</span>

              <span className='side-bar__position'>{additional_info?.position}</span>
            </span>
          </Link>
          {activeLink !== 'inbox' && <p className='side-bar__title'>DASHBOARDS</p>}

          {activeLink === 'inbox' ? (
            <InboxSideBar />
          ) : (
            <div className='side-bar__column'>
              <div className='side-bar__box'>
                {navLinks.map((navLink, index) => (
                  <Link
                    key={index}
                    href={navLink.path}
                    data-count={navLink.length}
                    className={`${activeLink === navLink.path ? 'side-bar__link active' : 'side-bar__link '} ${navLink.length ? 'count' : ''}`}
                    onClick={() => handleSetActiveLink(navLink.path)}
                  >
                    <span>{navLink.label}</span>
                  </Link>
                ))}
                <ul>
                  <li className='side-bar__link'>
                    <Link href={'#'} className={activeLink === '#' ? 'side-bar__link active' : 'side-bar__link'}>
                      <span>Account</span>
                    </Link>
                  </li>
                  <li>
                    <SubMenu>
                      {links.map((link, key) => (
                        <SideBarItem onClick={() => handleSetActiveLink('#')} key={key} href={link.url}>
                          {link.name}
                        </SideBarItem>
                      ))}
                    </SubMenu>
                  </li>
                </ul>
                <InboxItem activeLink={activeLink} handleSetActiveLink={(e) => handleSetActiveLink(e)} />
                {/* <ul>
                <li className='side-bar__link'>
                  <Link
                    href='/inbox'
                    onClick={() => handleSetActiveLink('inbox')}
                    className={activeLink === 'inbox' ? 'side-bar__link active' : 'side-bar__link'}
                  >
                    <span>inbox</span>
                  </Link>
                </li>
                <li>
                  <SubMenu>
                    {links.map((link, key) => (
                      <SideBarItem onClick={() => handleSetActiveLink('inbox')} key={key} href={link.url}>
                        {link.name}
                      </SideBarItem>
                    ))}
                  </SubMenu>
                </li>
              </ul> */}
                <Link
                  href='/assistance'
                  onClick={() => handleSetActiveLink('assistance')}
                  className={activeLink === 'assistance' ? 'side-bar__link active' : 'side-bar__link'}
                >
                  <span>Assistance</span>
                </Link>
              </div>
              <SignOut />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
