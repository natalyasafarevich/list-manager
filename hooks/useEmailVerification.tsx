import {useEffect, useState} from 'react';
import {getAuth, sendEmailVerification} from 'firebase/auth';
import firebaseApp from '@/firebase';

const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsVerified(user.emailVerified);
        checkEmailVerification(user);
      } else {
        setIsVerified(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);
  const checkEmailVerification = (user: any) => {
    if (user && !user.emailVerified) {
      if (auth.currentUser !== null) {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            alert('Письмо с подтверждением отправлено');
          })
          .catch((error: any) => {
            alert(error.message);
          });
      }
    }
  };
  return isVerified;
};

export default useEmailVerification;
