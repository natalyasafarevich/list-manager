'use client';
import {ResetDataUser} from '@/store/data-user/actions';
import {AppDispatch} from '@/store/store';
import {getAuth, signOut} from 'firebase/auth';

import {useDispatch} from 'react-redux';
import './SignOut.scss';
import {useRouter} from 'next/navigation';

const SignOut = () => {
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(ResetDataUser());
      setTimeout(() => {
        router.push('/');
      }, 0.1);
    } catch (error) {
      return null;
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
