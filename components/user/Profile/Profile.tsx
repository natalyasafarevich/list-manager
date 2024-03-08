'use client';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ChangeTheme from '../ChangeTheme/ChangeTheme';

const Profile = () => {
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <h1>Hi {user.displayName} + email</h1>
      <Link href={'/settings/profile'}>управление аккаунтом (settings)</Link>
      <br />
      <hr />
      <div className='d-block'>
        <ChangeTheme />
        {/* <button className='btn btn-secondary'>кнопка выбора темы</button> */}
        <hr />
      </div>
      <button className='btn btn-secondary'>кнопка выйти</button>
      <br />
    </div>
  );
};
export default Profile;
