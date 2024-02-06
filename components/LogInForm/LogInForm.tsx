'use client';
import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '@/firebase';
import GoogleSignInComponent from '../authMethods/google/Google';
import PhoneSignInComponent from '../authMethods/phone/Phone';
const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setError('');
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
      <GoogleSignInComponent />

      <PhoneSignInComponent />
    </div>
  );
};

export default LoginComponent;
