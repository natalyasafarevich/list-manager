'use client';

import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import RegistrationComponent from '../authMethods/email-password/EmailPassword';
import PhoneSignInComponent from '../authMethods/phone/Phone';
import GoogleSignInComponent from '../authMethods/google/Google';
import './RegistrationForm.scss';

const RegistrationForm = () => {
  const [methodOfEnter, setMethodOfEnter] = useState({
    isPhone: false,
    isEmail: true,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const signInMethod = searchParams.get('sign-in');
    if (signInMethod === 'phone') {
      setMethodOfEnter({
        isPhone: true,
        isEmail: false,
      });
    } else {
      setMethodOfEnter({
        isPhone: false,
        isEmail: true,
      });
    }
  }, [searchParams]);

  return (
    <div className='auth'>
      <div className='auth__container'>
        {methodOfEnter.isEmail && <RegistrationComponent />}
        {methodOfEnter.isPhone && <PhoneSignInComponent />}
        <br /> <GoogleSignInComponent />
        <br />
        {!methodOfEnter.isEmail && (
          <Link
            href='/registration'
            onClick={() => setMethodOfEnter({isPhone: false, isEmail: true})}
          >
            email & password
          </Link>
        )}
        <br />
        {!methodOfEnter.isPhone && (
          <Link
            href='/registration?sign-in=phone'
            onClick={() => setMethodOfEnter({isPhone: true, isEmail: false})}
          >
            Phone
          </Link>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
