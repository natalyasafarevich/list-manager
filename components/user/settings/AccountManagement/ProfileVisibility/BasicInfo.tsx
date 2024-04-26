'use client';
import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import './BasicInfo.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const BasicInfo = () => {
  const user = useSelector((state: RootState) => state.userdata.current_info);
  const users = useSelector((state: RootState) => state.userdata);
  // console.log(users);
  return (
    <div className='basic-info'>
      <p className='basic-info__title'> Settings</p>
      <div className='basic-info__row flex'>
        <div className='basic-info__box'>
          <p className='basic-info__subtitle'>Profile</p>
          <div
            className='basic-info__img'
            style={{background: `url(${user.photoURL}})`}}
          ></div>
          <p className='basic-info__name'>
            {user.displayName}
            {/* <span>{user.}</span> */}
          </p>

          <ChangePhoto />
        </div>

        <div className='basic-info__box'>
          {/* <h2 className='basic-info__subtitle'>Основная информация профиля</h2> */}
          <ProfileInformation></ProfileInformation>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
