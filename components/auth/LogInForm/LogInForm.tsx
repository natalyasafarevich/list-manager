'use client';
import React, {useEffect, useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '@/firebase';

import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import PhoneSignInComponent from '../authMethods/phone/Phone';
import GoogleSignInComponent from '../authMethods/google/Google';
import WelcomeHeader from '@/components/WelcomeHeader/WelcomeHeader';
import InputField from '@/components/InputField/InputField';
const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [methodOfEnter, setMethodOfEnter] = useState({
    isPhone: false,
    isEmail: true,
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    const params = searchParams.get('method');
    if (params === 'phone') {
      setMethodOfEnter((prev) => ({...prev, isPhone: true, isEmail: false}));
    } else {
      setMethodOfEnter((prev) => ({...prev, isPhone: false, isEmail: true}));
    }
  }, [searchParams]);
  const clearForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setMethodOfEnter((prev) => ({...prev, isPhone: false, isEmail: true}));
  };
  const auth = getAuth(firebaseApp);
  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      clearForm();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-credential': {
          setError('Wrong email or password');
        }
      }
    }
  };

  return (
    <div className='auth register'>
      <div className='auth-container'>
        {!methodOfEnter.isPhone && (
          <WelcomeHeader
            name='Sign In'
            subTitle='Don`t have an account?'
            text='Sign Up'
            link='registration'
          />
        )}
        <form onSubmit={handleLogin}>
          {methodOfEnter.isEmail && (
            <>
              {error && (
                <p className='text-error '>
                  {error} <br />
                  <br />
                </p>
              )}
              <div className='register__box'>
                <InputField
                  className='register__input'
                  label='Enter your email address'
                  id={'login-email'}
                  value={email}
                  type='email'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='register__box'>
                <InputField
                  className='register__input'
                  label='Enter your Password'
                  id={'login-email'}
                  value={password}
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' className='button-dark'>
                Login
              </button>
              <br />
            </>
          )}
        </form>

        {/* <div className='auth__item'> */}
        {methodOfEnter.isPhone && <PhoneSignInComponent />}
        <p className='auth__text text-center'>Or</p>
        <div className='flex auth__box flex'>
          <div className='auth__item'>
            <GoogleSignInComponent />
          </div>

          {methodOfEnter.isPhone && (
            <Link href={'log-in'} className='auth__link '>
              Email and Password
            </Link>
          )}
          <div className='auth__item'>
            {!methodOfEnter.isPhone && (
              <Link
                className='auth__link auth__link_phone'
                href={'log-in?method=phone'}
              ></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
