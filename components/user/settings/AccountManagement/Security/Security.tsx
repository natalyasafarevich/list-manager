import firebaseApp from '@/firebase';
import {getAuth, sendEmailVerification} from 'firebase/auth';
import {FC, useEffect, useState} from 'react';

const Security: FC = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        checkEmailVerification(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const checkEmailVerification = (user: any) => {
    if (user && !user.emailVerified) {
      user
        .sendEmailVerification()
        .then(() => {
          alert('Письмо с подтверждением отправлено');
        })
        .catch((error: any) => {
          alert(error.message);
        });
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Пользователь: {user.email}</p>
          {user.emailVerified ? (
            <p>Email подтвержден</p>
          ) : (
            <p>
              Email не подтвержден. Пожалуйста, проверьте свой почтовый ящик и
              подтвердите email.
            </p>
          )}
        </div>
      ) : (
        <p>Пользователь не аутентифицирован</p>
      )}
    </div>
  );
};

export default Security;
