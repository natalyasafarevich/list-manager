import React, {useEffect, useState} from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider, AuthError} from 'firebase/auth';
import './Google.scss';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {isSingInWithGoogle} from '@/store/auth/actions';
import {useSelector} from 'react-redux';
// import {fetchBackDefaultData} from '@/helper/getFirebaseData';

const GoogleSignInComponent = () => {
  const user = useSelector((state: RootState) => state.userdata.additional_info);
  const [currentUser, setCurrentUser] = useState<unknown>();
  // const [isExist, setIsExist] = useState<unknown>();

  // useEffect(() => {
  //   currentUser?.uid && fetchBackDefaultData(`users/${currentUser?.uid}`, setIsExist);
  // }, [currentUser?.uid]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.publicName) {
        router.push('/boards');
      } else {
        router.push('/complete-profile');
      }
    }
  }, [user, currentUser, router]);

  const dispatch: AppDispatch = useDispatch();
  // const [error, setError] = useState(null);
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(isSingInWithGoogle(true));
      setCurrentUser(user);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
        const authError = error as AuthError;
        const errorCode = authError.code;
        const errorMessage = authError.message;
        const email = authError.customData?.email || null;
        console.error('Google Sign In Error:', errorCode, errorMessage, email);
      }
    }
  };

  return (
    <div>
      <button className='google-button' onClick={handleGoogleSignIn}>
        <span className='google-button__icon'></span>
        <span className='google-button__title'> Sign In with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignInComponent;
