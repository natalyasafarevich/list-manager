'use client';
import firebaseApp from '@/firebase';
import {RootState} from '@/store/store';
import {getDatabase, ref, set, onValue} from 'firebase/database';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createdBoard} from '@/variables/variables';

import Email from './Email/Email';
import ProfileVisibility from './ProfileVisibility/ProfileVisibility';
import Security from './Security/Security';

// запись данных
async function writeUserData(
  userId: string,
  name: string,
  email: string,
  imageUrl: string,
  board: Array<any>,
) {
  const db = getDatabase(firebaseApp);
  try {
    await set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      board: board,
    });
    console.log('Data successfully written');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

export const AccountManagement = () => {
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    if (user) {
      // writeUserData(
      //   user.uid,
      //   user.displayName as string,
      //   user.email as string,
      //   user.phoneNumber as string,
      //   createdBoard,
      // );
    }
    // чтение данных
    const db = getDatabase(firebaseApp);
    const starCountRef = ref(db, 'users/' + user.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    });
  }, [user]);
  return (
    <>
      <div className='d-flex'>
        <Security />
        {/* <ProfileVisibility /> */}
        {/* <Email /> */}
      </div>
    </>
  );
};
