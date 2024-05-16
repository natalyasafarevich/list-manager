'use client';
import {ResetDataUser, getDataUser} from '@/store/data-user/actions';
import {AppDispatch, RootState} from '@/store/store';
import {getAuth, signOut} from 'firebase/auth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './SignOut.scss';
import {useRouter} from 'next/navigation';

const SignOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(ResetDataUser());
      setTimeout(() => {
        router.push('/');
      }, 0.1);

      console.log('Выход из приложения выполнен успешно');
    } catch (error) {
      console.error('Ошибка при выходе из приложения:', error);
    }
  };

  return (
    <button className='sign-out-button button-dark' onClick={handleSignOut}>
      <span className='sign-out-button__icon'></span>
      <span>Sign Out</span>
    </button>
  );
};

export default SignOut;
