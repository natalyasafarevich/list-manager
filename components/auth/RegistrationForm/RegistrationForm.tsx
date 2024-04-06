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
      <div className='auth__container auth-container'>
        {methodOfEnter.isEmail && <RegistrationComponent />}
        {methodOfEnter.isPhone && <PhoneSignInComponent />}
        <p className='auth__text'>Or</p>
        <div className='auth__box flex'>
          <div className='auth__item'>
            <GoogleSignInComponent />
          </div>
          <div className='auth__item'>
            {!methodOfEnter.isEmail && (
              <Link
                className='auth__link '
                href='/registration'
                onClick={() =>
                  setMethodOfEnter({isPhone: false, isEmail: true})
                }
              >
                Email and Password
              </Link>
            )}
          </div>
          <div className='auth__item'>
            {!methodOfEnter.isPhone && (
              <Link
                className='auth__link auth__link_phone'
                href='/registration?sign-in=phone'
                onClick={() =>
                  setMethodOfEnter({isPhone: true, isEmail: false})
                }
              ></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
