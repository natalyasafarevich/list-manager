'use client';

import {RootState} from '@/store/store';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export function useRedirectToProfile(user: any) {
  const router = useRouter();
  // const isUser = useSelector((state: RootState) => state.userdata.uid);
  useEffect(() => {
    user && router.push(`/user?id=${user}`);
  }, [user]);
  return;
}
