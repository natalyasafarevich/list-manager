'use client';

import {FC, useEffect, useRef, useState} from 'react';
import './ProfilePopup.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import ChangeTheme from '../ChangeTheme/ChangeTheme';
import SignOut from '../auth/SignOut/SignOut';

const ProfilePopup: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.userdata);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='profile-popup' ref={popupRef}>
      <div
        onClick={togglePopup}
        className='dashboard-header__user'
        style={{
          background: `center/cover no-repeat url(${user.photoURL})`,
        }}
      ></div>
      {isOpen && (
        <div className='profile-popup__box'>
          {/* <ChangeTheme /> */}
          <div className='profile-popup__item'>
            <p className='profile-popup__subtitle'>Account</p>
            <div className='profile-popup__row flex'>
              <div
                className='profile-popup__user'
                style={{
                  background: `center/cover no-repeat url(${user.photoURL})`,
                }}
              ></div>
              <p className='profile-popup__name'>
                {user.displayName}
                <span>{user.email}</span>
              </p>
            </div>
            <Link className='profile-popup__link' href={'/settings/profile'}>
              Account management
            </Link>
          </div>
          <div className='profile-popup__setting'>
            <p className='profile-popup__subtitle'>Settings</p>
            <Link className='profile-popup__link' href={'/settings/security'}>
              Personal data
            </Link>
            <Link className='profile-popup__link' href={'/settings/security'}>
              Change password
            </Link>

            <p className='profile-popup__subtitle'>Other</p>
            {/* !!! создать */}
            <Link className='profile-popup__link' href={'/notifications'}>
              Notifications
            </Link>
            <Link className='profile-popup__link' href={'/assistance'}>
              Assistance
            </Link>
            <div className='profile-popup__button'>
              <SignOut />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePopup;
