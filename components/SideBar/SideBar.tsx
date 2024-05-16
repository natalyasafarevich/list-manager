'use client';
import {FC, useEffect, useState} from 'react';
import './SideBar.scss';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import SideBarItem from './SideBarItem/SideBarItem';
import SubMenu from './SubMenu/SubMenu';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const links = [
  {url: '/settings/profile', name: 'General settings'},
  {url: '/settings/contacts', name: 'Contacts'},
  {url: '/settings/security', name: 'Security'},
  {url: '/settings/delete-account', name: 'Delete account'},
];
interface NavLink {
  path: string;
  label: string;
  length?: number | null;
}
const SideBar: FC = () => {
  const [countBoard, setCountBoard] = useState<null | number>();
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [activeLink, setActiveLink] = useState('');

  const board = useSelector((state: RootState) => state.boards.boards);
  const user = useSelector((state: RootState) => state.userdata);
  const {additional_info, uid} = user;
  useEffect(() => {
    board && setCountBoard(Object.keys(board).length);
  }, [board]);

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
          <Link target='_blank' href={`/profile/${uid}`} className='side-bar__user'>
            <span className='side-bar__flex  flex'>
              <span
                className='side-bar__img'
                style={{background: `center/cover no-repeat url(${additional_info?.mainPhoto?.url})`}}
              ></span>
              <span className='side-bar__name'>{additional_info?.fullName}</span>

              <span className='side-bar__position'>{additional_info?.position}</span>
            </span>
          </Link>
          <p className='side-bar__title'>DASHBOARDS</p>

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
              <Link href='/assistance' className='side-bar__link'>
                <span>Assistance</span>
              </Link>
            </div>
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
