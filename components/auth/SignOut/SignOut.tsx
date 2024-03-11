'use client';
import {ResetDataUser, getDataUser} from '@/store/data-user/actions';
import {AppDispatch, RootState} from '@/store/store';
import {getAuth, signOut} from 'firebase/auth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const SignOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(ResetDataUser());
      console.log('Выход из приложения выполнен успешно');
    } catch (error) {
      console.error('Ошибка при выходе из приложения:', error);
    }
  };

  return <button onClick={handleSignOut}>Выход</button>;
};

export default SignOut;
