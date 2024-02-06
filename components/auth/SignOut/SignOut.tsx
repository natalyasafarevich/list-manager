'use client';
import {getAuth, signOut} from 'firebase/auth';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log('Выход из приложения выполнен успешно');
    } catch (error) {
      console.error('Ошибка при выходе из приложения:', error);
    }
  };

  return <button onClick={handleSignOut}>Выход</button>;
};

export default SignOut;
