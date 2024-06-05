import {FC, useEffect, useState} from 'react';
import './ProfilePopup.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import useClickOutside from '@/hooks/useClickOutside';
import useResponsive from '@/hooks/useResponsive';

const ProfilePopup: FC = () => {
  const user = useSelector((state: RootState) => state.userdata);
  const [avatar, setAvatar] = useState('');
  const {isMobile} = useResponsive();

  useEffect(() => {
    setAvatar(user?.additional_info?.mainPhoto?.url || '/default-image.svg');
  }, [user?.additional_info?.mainPhoto?.url]);

  const {ref, isClose, setIsClose} = useClickOutside<HTMLDivElement>(true, true);

  return (
    <div className='profile-popup' ref={ref}>
      <div className='profile-popup__flex'>
        <div
          onClick={() => (isMobile ? {} : setIsClose(!isClose))}
          className='dashboard-header__user'
          style={{
            background: `center/cover no-repeat url(${user?.additional_info?.mainPhoto?.url || '/default-image.svg'})`,
          }}
        ></div>
        {isMobile && (
          <div className='profile-popup__name'>
            <span> Hello</span>
            {user.displayName}
          </div>
        )}
      </div>

      {!isClose && (
        <div className='profile-popup__box'>
          <div className='profile-popup__item'>
            <p className='profile-popup__subtitle'>Account</p>
            <Link href={`/profile/${user.uid}`} className='profile-popup__row flex'>
              <span
                className='profile-popup__user'
                style={{
                  background: `center/cover no-repeat url(${avatar})`,
                }}
              ></span>
              <span className='profile-popup__name'>
                {user.displayName}
                <span>{user.email}</span>
              </span>
            </Link>
            <Link className='profile-popup__link' href={'/settings/profile'}>
              Account management
            </Link>
          </div>
          <div className='profile-popup__setting'>
            <p className='profile-popup__subtitle'>Settings</p>
            <Link className='profile-popup__link' href={'/settings/security'}>
              Change password
            </Link>

            <p className='profile-popup__subtitle'>Other</p>

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
