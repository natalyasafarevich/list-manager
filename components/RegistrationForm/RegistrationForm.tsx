'use client';
import RegistrationComponent from '@/components/authMethods/email-password/EmailPassword';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import PhoneSignInComponent from '../authMethods/phone/Phone';
import GoogleSignInComponent from '../authMethods/google/Google';

const RegistrationForm = () => {
  const [methodOfEnter, setMethodOfEnter] = useState({
    isPhone: false,
    isGoogle: false,
    isEmail: true,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const signInMethod = searchParams.get('sign-in');
    if (signInMethod === 'phone') {
      setMethodOfEnter({
        isGoogle: false,
        isPhone: true,
        isEmail: false,
      });
    } else {
      setMethodOfEnter({
        isGoogle: false,
        isPhone: false,
        isEmail: true,
      });
    }
  }, [searchParams]);

  return (
    <>
      {methodOfEnter.isEmail && <RegistrationComponent />}
      {methodOfEnter.isPhone && <PhoneSignInComponent />}
      <br /> <GoogleSignInComponent />
      <br />
      {!methodOfEnter.isEmail && (
        <Link
          href='/registration'
          onClick={() =>
            setMethodOfEnter({isGoogle: false, isPhone: false, isEmail: true})
          }
        >
          email & password
        </Link>
      )}
      <br />
      {!methodOfEnter.isPhone && (
        <Link
          href='/registration?sign-in=phone'
          onClick={() =>
            setMethodOfEnter({isGoogle: false, isPhone: true, isEmail: false})
          }
        >
          Phone
        </Link>
      )}
    </>
  );
};

export default RegistrationForm;
