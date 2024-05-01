import {FC} from 'react';
import './ProfilePopup.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import useClickOutside from '@/hooks/useClickOutside';

const ProfilePopup: FC = () => {
  const user = useSelector((state: RootState) => state.userdata);
  console.log(user);
  const {ref, isClose, setIsClose} = useClickOutside<HTMLDivElement>(
    true,
    true,
  );

  return (
    <div className='profile-popup' ref={ref}>
      <div
        onClick={() => setIsClose(!isClose)} // Обновлено
        className='dashboard-header__user'
        style={{
          background: `center/cover no-repeat url(${user.photoURL})`,
        }}
      ></div>
      {!isClose && (
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
