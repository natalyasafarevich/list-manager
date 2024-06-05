import React, {useEffect, useState} from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import './Google.scss';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {isSingInWithGoogle} from '@/store/auth/actions';
import {useSelector} from 'react-redux';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';

const GoogleSignInComponent = () => {
  const user = useSelector((state: RootState) => state.userdata.additional_info);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isExist, setIsExist] = useState<any>();

  useEffect(() => {
    currentUser?.uid && fetchBackDefaultData(`users/${currentUser?.uid}`, setIsExist);
  }, [currentUser?.uid]);

  useEffect(() => {
    if (user) {
      if (user?.publicName) {
        router.push('/boards');
      } else {
        router.push('/complete-profile');
      }
    }
  }, [user, currentUser]);

  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(isSingInWithGoogle(true));
      setCurrentUser(user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData ? error.customData.email : null;

      console.error('Google Sign In Error:', errorCode, errorMessage, email);
      setError(errorMessage);
    }
  };

  return (
    <div>
      <button className='google-button' onClick={handleGoogleSignIn}>
        <span className='google-button__icon'></span>
        <span className='google-button__title'> Sign In with Google</span>
      </button>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default GoogleSignInComponent;
