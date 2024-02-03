'use client';

import {handleRegister} from '@/firebase/registration';
import {isValidEmail} from '@/helper/validationEmail';
import {useEffect, useState} from 'react';

const RegistrationComponent = () => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEqualPassword, setIsEqualPassword] = useState(true);

  useEffect(() => {
    if (confirmPassword !== password) {
      setIsEqualPassword(false);
    } else {
      setIsEqualPassword(true);
    }
  }, [confirmPassword]);

  const checkPassword = (e: React.FormEvent<HTMLInputElement>) => {
    const current_password = e.currentTarget.value;
    setConfirmPassword(current_password);
  };
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValide = isValidEmail(email);
    if (isEqualPassword && isValide) {
      handleRegister(email, password);
      setIsEqualPassword(false);
      setIsEmailCorrect(false);
    } else {
      setIsEqualPassword(false);
      setIsEmailCorrect(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      {!isEmailCorrect && <h3>wrong email</h3>}
      <input
        type='email'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isEqualPassword && <h2>Пароли не совпадают</h2>}
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='password'
        placeholder='ConfirmPassword'
        onChange={checkPassword}
      />
      <button type='submit'>Register</button>
    </form>
  );
};
export default RegistrationComponent;
