import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import axios from 'axios';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import {useEffect, useState} from 'react';

const ProfileVisibility = () => {
  return (
    <div>
      <div>
        <h1>Geolocation App</h1>
        {/* create a button that is mapped to the function which retrieves the users location */}
        {/* <button onClick={getUserLocation}>Get User Location</button> */}
        {/* if the user location variable has a value, print the users location */}
      </div>
      <p className='text-info'>Профиль и видимость</p>
      <ChangePhoto />
      <br />
      <h2 className='text-secondary'>Основная информация профиля</h2>
      <ProfileInformation></ProfileInformation>
    </div>
  );
};

export default ProfileVisibility;
