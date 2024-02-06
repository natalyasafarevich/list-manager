'use client';
import {use, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User, UserInfo} from 'firebase/auth';

import {useRouter} from 'next/navigation';
import firebaseApp from '@/firebase';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getDataUser} from '@/store/data-user/actions';

const UserStatus = () => {
  const [user, setUser] = useState<any>();

  const dispatch: AppDispatch = useDispatch();

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: UserInfo | null) => {
      if (user) {
        const {displayName, email, phoneNumber, photoURL, uid} = user;
        setUser({displayName, email, phoneNumber, photoURL, uid});
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      console.log('Пользователь вошел:', user);
      dispatch(getDataUser({...user}));

      // route.push(`/user?id=${user.uid.slice(0, 8)}`);
    } else {
      console.log('Пользователь не вошел.');
    }
  }, [user]);

  return <div></div>;
};

export default UserStatus;
