'use client';
import Link from 'next/link';
import {FC} from 'react';
import SignOut from '../auth/SignOut/SignOut';
import Notification from '../Notification/Notification';
import './Header.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const Header: FC = () => {
  const user = useSelector((state: RootState) => state.userdata.uid);
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__row'>
          <div className='header__wrap flex'>
            <Link href='/' className='header__logo logo'></Link>
            <Link className='header__link' href='/about'>
              About
            </Link>
          </div>
          <div className='header__links flex'>
            <Link className='header__link' href='/registration'>
              Sign Up
            </Link>
            <Link className='header__link header__link_signIn' href='/log-in'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
