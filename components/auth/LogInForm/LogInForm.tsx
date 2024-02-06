'use client';
import React, {useEffect, useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '@/firebase';
import GoogleSignInComponent from '../../authMethods/google/Google';
import PhoneSignInComponent from '../../authMethods/phone/Phone';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
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
      console.log(')');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-credential': {
          setError('wrong email or password');
        }
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {methodOfEnter.isEmail && (
        <>
          <form onSubmit={handleLogin}>
            {error && <p>{error}</p>}
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
          </form>
          <br /> <Link href={'log-in?method=phone'}>Phone</Link>
        </>
      )}

      {methodOfEnter.isPhone && (
        <>
          {' '}
          <PhoneSignInComponent /> <br />{' '}
          <Link href={'log-in'}>Password & Email</Link>
        </>
      )}
      <br />
      <GoogleSignInComponent />
    </div>
  );
};

export default LoginComponent;
