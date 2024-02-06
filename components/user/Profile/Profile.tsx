'use client';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Profile = () => {
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <h1>Hi {user.displayName}</h1>
      {/* <Link href={'/settings'}>настройки</Link> */}
      <br />

      <Link href={'/settings'}>управление аккаунтом</Link>
      <br />

      <button>кнопка выйти</button>
      <button>кнопка выбора темы</button>
      <br />
    </div>
  );
};
export default Profile;
