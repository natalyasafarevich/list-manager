'use client';

import {handleRegister, isUserExist} from '@/firebase/registration';
import {useState} from 'react';
import GoogleSignInComponent from '../google/Google';
import PhoneSignInComponent from '../phone/Phone.jsx';
import Link from 'next/link';

const RegistrationComponent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);
  const [isIrregularPassword, setIsIrregularPassword] = useState({
    isIrregular: false,
    note: '',
  });

  const checkPassword = (e: React.FormEvent<HTMLInputElement>) => {
    const current_password = e.currentTarget.value;
    setConfirmPassword(current_password);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsEmailCorrect(true);
    setIsUserExist(false);
    setIsIrregularPassword((prev) => ({
      ...prev,
      isIrregular: false,
      note: '',
    }));
  };
  const handleEmailAlreadyInUse = () => {
    setIsUserExist(true);
    setIsIrregularPassword((prev) => ({
      ...prev,
      isIrregular: false,
      note: '',
    }));
  };
  const handleInvalidEmail = () => {
    setIsEmailCorrect(false);
  };

  const handleMissingPassword = () => {
    setIsIrregularPassword((prev) => ({
      ...prev,
      isIrregular: true,
      note: 'Enter the password',
    }));
  };

  const handleWeakPassword = () => {
    setIsUserExist(false);
    setIsEmailCorrect(true);
    setIsIrregularPassword((prev) => ({
      ...prev,
      isIrregular: true,
      note: 'Password is weak',
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsIrregularPassword((prev) => ({
        ...prev,
        isIrregular: true,
        note: 'Passwords aren` Equal',
      }));
      return;
    }

    try {
      const user = await handleRegister(email, password, name);

      clearForm();
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          handleEmailAlreadyInUse();
          break;
        case 'auth/invalid-email':
          handleInvalidEmail();
          break;
        case 'auth/missing-password':
          handleMissingPassword();
          break;
        case 'auth/weak-password':
          handleWeakPassword();
          break;
        default:
          console.error('Error registering user:', errorCode, error.message);
      }
    }
  };

  return (
    <>
      {/* <PhoneSignInComponent />
      <GoogleSignInComponent /> */}
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isUserExist && <p>user already exist</p>}
        {!isEmailCorrect && <h3>wrong email</h3>}
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {!isEqualPassword && <h2>Пароли не совпадают</h2>} */}
        {isIrregularPassword.isIrregular && <p>{isIrregularPassword.note}</p>}
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type='password'
          placeholder='ConfirmPassword'
          onChange={checkPassword}
          value={confirmPassword}
        />
        <button type='submit'>Register</button>
      </form>
    </>
  );
};
export default RegistrationComponent;
