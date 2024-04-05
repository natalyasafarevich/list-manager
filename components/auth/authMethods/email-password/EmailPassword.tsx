'use client';

import {handleRegister, isUserExist} from '@/firebase/registration';
import {useState} from 'react';
import './EmailPassword.scss';
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
    <div className='register'>
      <div className='register__container'>
        <form onSubmit={handleSubmit}>
          <div className='register__row flex'>
            <div className=''>
              <p className='register__title'>Welcome to Trello</p>{' '}
              <p className='register__subtitle'>Sign Up</p>
            </div>

            <p className='register__text'>
              Have an account? ?<Link href={'/log-in'}>Sign In</Link>
            </p>
          </div>
          <div className='register__column'>
            <div className='register__box'>
              <label htmlFor='name' className='register__label'>
                Enter your full name
              </label>
              <input
                className='register__input'
                id='name'
                type='text'
                placeholder='Full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='register__box'>
              <label htmlFor='email' className='register__label'>
                Enter your email address
              </label>
              <input
                className='register__input'
                id='email'
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isUserExist && <p className='text-error'>user already exist</p>}
              {!isEmailCorrect && <p className='text-error'>wrong email</p>}
            </div>

            {/* {!isEqualPassword && <h2>Пароли не совпадают</h2>} */}
            {isIrregularPassword.isIrregular && (
              <p>{isIrregularPassword.note}</p>
            )}
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegistrationComponent;
