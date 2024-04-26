'use client';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import UserStatus from '@/components/auth/UserStatus/UserStatus';
import {useRedirectToProfile} from '@/hooks/useRedirectToProfile';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function Registration() {
  // const router = useRouter();
  const isUser = useSelector(
    (state: RootState) => state.userdata.current_info.uid,
  );
  // useRedirectToProfile(isUser);
  // useEffect(() => {
  //   isUser && router.push(`/user?id=${isUser}`);
  // }, [isUser]);
  return (
    <>
      <RegistrationForm />

      {/* <RegistrationComponent />
      <Link href={'/registration?google'}>Google</Link>
      <br />
      <Link href={'/registration?phone'}>Phone</Link> */}
    </>
  );
}
