'use client';
import {getDataUser} from '@/store/data-user/actions';
import {AppDispatch} from '@/store/store';
import {getAuth, signOut} from 'firebase/auth';
import {useDispatch} from 'react-redux';

const SignOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(getDataUser({}));
      console.log('Выход из приложения выполнен успешно');
    } catch (error) {
      console.error('Ошибка при выходе из приложения:', error);
    }
  };

  return <button onClick={handleSignOut}>Выход</button>;
};

export default SignOut;
