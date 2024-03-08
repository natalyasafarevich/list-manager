import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import axios from 'axios';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import {useEffect, useState} from 'react';

const ProfileVisibility = () => {
  return (
    <div className='d-flex justify-content-center w-100'>
      <div>
        <ChangePhoto />
        <br />
        <h2 className='text-secondary'>Основная информация профиля</h2>
        <ProfileInformation></ProfileInformation>
      </div>
    </div>
  );
};

export default ProfileVisibility;
