'use client';

import {handleRegister, isUserExist} from '@/firebase/registration';
import {useState} from 'react';
import './EmailPassword.scss';
import Link from 'next/link';
import InputField from '@/components/InputField/InputField';
import WelcomeHeader from '@/components/WelcomeHeader/WelcomeHeader';
import {useRouter} from 'next/navigation';
import {getDataUser} from '@/store/data-user/actions';
import {AppDispatch} from '@/store/store';
import {useDispatch} from 'react-redux';
import {updateFirebaseData} from '@/helper/updateUserData';

const RegistrationComponent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
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
  const dispatch: AppDispatch = useDispatch();
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
        note: 'Passwords don`t match',
      }));
      return;
    }

    try {
      const user = await handleRegister(email, password, name);

      const user_info = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      };
      updateFirebaseData(`users/${user.uid}`, user_info);
      router.push('/complete-profile');
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
          <WelcomeHeader
            name='Sign Up'
            subTitle='Have an account?'
            text='Sign In'
            link='log-in'
          />

          <div className='register__column'>
            <div className='register__box'>
              <InputField
                className='register__input'
                label='Enter your full name'
                id={'name'}
                value={name}
                type='text'
                placeholder='Full name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='register__box'>
              <InputField
                className={`${isUserExist || !isEmailCorrect ? 'input-error' : ''} register__input`}
                label='Enter your email address'
                id={'email'}
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isUserExist && <p className='text-error'>User already exists</p>}
              {!isEmailCorrect && <p className='text-error'>Wrong email</p>}
            </div>
            <div className='register__box'>
              <InputField
                className={`${isIrregularPassword.isIrregular ? 'input-error' : ''} register__input`}
                label='Enter your password'
                id={'password'}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {isIrregularPassword.isIrregular && (
                <p className='text-error'>{isIrregularPassword.note}</p>
              )}
              <br />
              <InputField
                className={`${isIrregularPassword.isIrregular ? 'input-error' : ''} register__input`}
                label='Repeat your password'
                id={'confirm-password'}
                type='password'
                placeholder='Confirm password'
                onChange={checkPassword}
                value={confirmPassword}
              />
            </div>
            <button className='register__button' type='submit'>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegistrationComponent;
