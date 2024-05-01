'use client';
import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import './BasicInfo.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const BasicInfo = () => {
  // const user = useSelector((state: RootState) => state.auth.user_names);
  const user_data = useSelector(
    (state: RootState) => state.userdata.additional_info,
  );
  // console.log(user, 'j');
  return (
    <div className='basic-info'>
      {/* <p className='basic-info__title'> Settings</p> */}
      <div className='basic-info__row flex'>
        <div className='basic-info__box'>
          <p className='basic-info__subtitle'>Profile</p>
          <div className='basic-info__avatar'>
            <ChangePhoto />
          </div>
          <p className='basic-info__name'>
            {user_data?.fullName}
            <span>{user_data?.position}</span>
          </p>
          <p className='basic-info__country'>{user_data?.country}</p>
        </div>

        <div className='basic-info__box'>
          <div className='basic-info__row basic-info__row-between flex'>
            <p className='basic-info__subtitle basic-info__subtitle-black'>
              BASIC INFO
            </p>
            <button className='btn-edit' onClick={(_e) => {}}></button>
          </div>
          <ProfileInformation />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
