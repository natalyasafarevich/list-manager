'use client';
import {use, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User, UserInfo} from 'firebase/auth';

import {useRouter} from 'next/navigation';
import firebaseApp from '@/firebase';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getDataUser} from '@/store/data-user/actions';
import {getDatabase, onValue, ref} from 'firebase/database';
import {getBoards} from '@/store/board/actions';

const UserStatus = () => {
  const [user, setUser] = useState<any>();

  const dispatch: AppDispatch = useDispatch();
  const current_user = useSelector((state: RootState) => state.userdata);
  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);

  useEffect(() => {
    if (current_user.uid) {
      const starCountRef = ref(db, `users/${user.uid}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.boards) {
          dispatch(getBoards(data.boards));
        }
      });
    }
  }, [current_user.uid]);
  
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
