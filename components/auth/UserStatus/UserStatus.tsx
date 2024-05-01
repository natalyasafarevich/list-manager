'use client';
import {use, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User, UserInfo} from 'firebase/auth';

import {useRouter} from 'next/navigation';
import firebaseApp from '@/firebase';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getAdditionalInfo, getDataUser} from '@/store/data-user/actions';
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
  // const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserNames(userNames));
  }, [userNames]);
  useEffect(() => {
    if (user) {
      console.log('Пользователь вошел:', user);
      dispatch(getDataUser({...user}));
      fetchBackDefaultData(
        `/users/${user.uid}/additional-info`,
        setAdditionalInfo,
      );
      fetchBackDefaultData('/user-names/all', setUserNames);
      // console.log(user, 'kkokfoe');
      // getAdditionalInfo
      // route.push(`/user?id=${user.uid.slice(0, 8)}`);
    } else {
      console.log('Пользователь не вошел.');
    }
  }, [user]);

  return <div></div>;
};

export default UserStatus;
