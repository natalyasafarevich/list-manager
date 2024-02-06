'use client';
import {RootState} from '@/store/store';
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
    </div>
  );
};
export default Profile;
