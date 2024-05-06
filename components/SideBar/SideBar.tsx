import {FC, useState} from 'react';
import './SideBar.scss';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import SideBarItem from './SideBarItem/SideBarItem';
import SubMenu from './SubMenu/SubMenu';

const links = [
  {url: '/settings/profile', name: 'General settings'},
  {url: '/settings/contacts', name: 'Contacts'},
  {url: '/settings/security', name: 'Security'},
  {url: '/settings/delete-account', name: 'Delete account'},
];
interface NavLink {
  path: string;
  label: string;
}
const SideBar: FC = () => {
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    {path: '/boards', label: 'Boards'},
    {path: '/to-do', label: 'To-Do'},
    {path: '/templates', label: 'Templates'},
  ]);
  const [activeLink, setActiveLink] = useState('');

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div className={`side-bar `}>
      <div className='side-bar__wrap'>
        <div className='side-bar__container'>
          <Link href={'/'} className='side-bar__logo'></Link>
          <div className='side-bar__column'>
            <div className='side-bar__box'>
              {navLinks.map((navLink, index) => (
                <Link
                  key={index}
                  href={navLink.path}
                  className={
                    activeLink === navLink.path
                      ? 'side-bar__link active'
                      : 'side-bar__link'
                  }
                  onClick={() => handleSetActiveLink(navLink.path)}
                >
                  <span>{navLink.label}</span>
                </Link>
              ))}
              <ul>
                <li className='side-bar__link'>
                  <Link
                    href={'#'}
                    className={
                      activeLink === '#'
                        ? 'side-bar__link active'
                        : 'side-bar__link'
                    }
                  >
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <SubMenu>
                    {links.map((link, key) => (
                      <SideBarItem
                        onClick={() => handleSetActiveLink('#')}
                        key={key}
                        href={link.url}
                      >
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
