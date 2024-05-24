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
import useResponsive from '@/hooks/useResponsive';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import AddBoard from './Mobile/AddBoard';

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
  const {isMobile} = useResponsive();

  const [countBoard, setCountBoard] = useState<null | number>();
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    setActiveLink(pathname.substring(pathname.lastIndexOf('/') + 1));
  }, [pathname]);

  const user = useSelector((state: RootState) => state.userdata);
  const {additional_info, uid} = user;

  useEffect(() => {
    setNavLinks([
      {path: '/boards', label: 'Boards', length: countBoard},
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
          {!isMobile && (
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
          )}
          {!isMobile && activeLink !== 'inbox' && <p className='side-bar__title'>DASHBOARDS</p>}

          {activeLink === 'inbox' ? (
            <></>
          ) : (
            <div className='side-bar__column'>
              <div className='side-bar__box'>
                {navLinks.map((navLink, index) => (
                  <Link
                    key={index}
                    href={navLink.path}
                    data-count={navLink.length}
                    className={`${
                      activeLink === navLink.path
                        ? 'side-bar__link active'
                        : `side-bar__link side-bar__link-${navLink.label.toLocaleLowerCase()}`
                    }
                     ${navLink.length ? 'count' : ''}`}
                    onClick={() => handleSetActiveLink(navLink.path)}
                  >
                    {!isMobile && <span>{navLink.label}</span>}
                  </Link>
                ))}
                {/* <CreateBoardForm setIsOpen={setIsOpen} isClose={isOpen} /> */}
                {isMobile && <AddBoard />}
                <ul>
                  <li className=''>
                    <Link
                      href={isMobile ? '/settings' : '#'}
                      className={activeLink === '#' ? 'side-bar__link active' : `side-bar__link side-bar__link-account`}
                    >
                      {!isMobile && <span>Account</span>}
                    </Link>
                  </li>

                  {!isMobile && (
                    <li>
                      <SubMenu>
                        {links.map((link, key) => (
                          <SideBarItem onClick={() => handleSetActiveLink('#')} key={key} href={link.url}>
                            {link.name}
                          </SideBarItem>
                        ))}
                      </SubMenu>
                    </li>
                  )}
                </ul>
                <InboxItem activeLink={activeLink} handleSetActiveLink={(e) => handleSetActiveLink(e)} />
                {!isMobile && (
                  <Link
                    href='/assistance'
                    onClick={() => handleSetActiveLink('assistance')}
                    className={activeLink === 'assistance' ? 'side-bar__link active' : 'side-bar__link'}
                  >
                    <span>Assistance</span>
                  </Link>
                )}
              </div>
              {!isMobile && <SignOut />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
