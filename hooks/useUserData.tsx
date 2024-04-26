'use client';

import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {getDataUser} from '@/store/data-user/actions';
import {AppDispatch} from '@/store/store';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

export function useUserData(user: any) {
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    fetchBackDefaultData(`users/${user.uid}/main-info`, setData);
  }, [user]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (data) {
      // fetchBackDefaultData(`users/${user.uid}`)
      // dispatch(getDataUser({...data}));
    }
  }, [data]);
  return;
}
