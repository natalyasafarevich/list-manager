import React, {useState} from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

const GoogleSignInComponent = () => {
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign In:', user);
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData ? error.customData.email : null;

      console.error('Google Sign In Error:', errorCode, errorMessage, email);
      setError(errorMessage);
    }
  };

  return (
    <div>
      {/* <h2>Sign In with Google</h2>   */}
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default GoogleSignInComponent;
