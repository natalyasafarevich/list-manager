import React, {useState} from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import './Google.scss';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {isSingInWithGoogle} from '@/store/auth/actions';
import {useSelector} from 'react-redux';

const GoogleSignInComponent = () => {
  const u = useSelector((state: RootState) => state.auth.isGoogleProvider);
  // console.log(u);
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
      router.push('/complete-profile');
      console.log('Google Sign In:', user);
    } catch (error: any) {
      // dispatch(isSingInWithGoogle(false));
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
