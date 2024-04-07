'use client';

import {FC, useEffect, useRef, useState} from 'react';
import './ProfilePopup.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

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
      {!isOpen && (
        <div className='profile-popup__box'>
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
          </div>
          <div className=''>
            <p className='profile-popup__subtitle'>Settings</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePopup;
