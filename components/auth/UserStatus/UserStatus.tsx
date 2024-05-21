'use client';

import {usePathname, redirect} from 'next/navigation';
import {use, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User, UserInfo} from 'firebase/auth';
import firebaseApp from '@/firebase';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getAdditionalInfo, getDataUser, isUserUpdated} from '@/store/data-user/actions';
import {getDatabase, onValue, ref} from 'firebase/database';
import {getBoards} from '@/store/board/actions';
import {updateUserData} from '@/helper/updateUserData';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {getUserNames} from '@/store/auth/actions';

const UserStatus = () => {
  const [user, setUser] = useState<any>();

  const dispatch: AppDispatch = useDispatch();
  const current_user = useSelector((state: RootState) => state.userdata);

  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);

  useEffect(() => {
    const starCountRef = ref(db, `/boards`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(getBoards(data));
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: UserInfo | null) => {
      if (user) {
        const {displayName, email, phoneNumber, photoURL, uid} = user;
        setUser({displayName, email, phoneNumber, photoURL, uid});

        updateUserData(`${uid}/`, {
          email: email,
          phoneNumber: phoneNumber,
          displayName: displayName,
          photoURL: photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);
  const [additionalInfo, setAdditionalInfo] = useState<any>();
  useEffect(() => {
    dispatch(getAdditionalInfo(additionalInfo));
  }, [additionalInfo]);
  const [userNames, setUserNames] = useState<Array<string>>([]);
  useEffect(() => {
    dispatch(getUserNames(userNames));
  }, [userNames]);
  useEffect(() => {
    // if
    user && fetchBackDefaultData(`/users/${user?.uid}/additional-info`, setAdditionalInfo);
    dispatch(isUserUpdated(false));
  }, [user, current_user.isUpdate]);
  useEffect(() => {
    if (user || current_user.isUpdate) {
      dispatch(getDataUser({...user}));
      fetchBackDefaultData('/user-names/all', setUserNames);
    }
  }, [user, current_user.isUpdate]);

  const pathname = usePathname();
  useEffect(() => {
    if (current_user && pathname === '/') {
      redirect('/boards');
    }
  }, [current_user]);
  return <div></div>;
};

export default UserStatus;
