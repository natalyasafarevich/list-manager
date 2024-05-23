'use client';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import BlueGradientButton from '../Buttons/BlueGradientButton/BlueGradientButton';
import {links} from '@/variables/default';
import './Header.scss';
import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';

const Header: FC = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [isTestingItem, setIsTestingItem] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };
  const user = useSelector((state: RootState) => state.userdata.uid);

  if (!user)
    return (
      <header className='header'>
        <div className='header__container'>
          <div className='header__row'>
            <div className='header__wrap flex'>
              <Link href='/' className='header__logo logo'>
                HiveMind
              </Link>
            </div>
            <div className='header__box flex'>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header__link ${activeLink === link.href ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`header__link header__link__test`}>
                <span onClick={(_e) => setIsTestingItem(!isTestingItem)}>Testing*</span>

                {isTestingItem && (
                  <ClickAwayListener setIsOpen={(e) => setIsTestingItem(e)}>
                    <div className='header__popup'>
                      <p>Data for testing:</p>
                      <span>
                        Login: <b>tester@test.com</b>
                      </span>
                      <span>
                        Password: <b>Test1234!</b>
                      </span>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <div className='header__links flex'>
              <Link className='header__link' href='/registration'>
                Sign Up
              </Link>
              <BlueGradientButton
                title='Sign In'
                className='header__link header__link_signIn button-light-blue'
                href='/log-in'
              />
            </div>
          </div>
        </div>
      </header>
    );
};
export default Header;
