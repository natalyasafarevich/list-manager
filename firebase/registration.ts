import firebaseApp from '@/firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth';

export const isUserExist = (a: boolean) => {
  return a;
};

export const handleRegister = async (email: string, password: string) => {
  // try {
  const auth = getAuth(firebaseApp);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // Успешная регистрация
  const user = userCredential.user;
  console.log('User registered successfully:', user);
  // } catch (error: any) {
  //   const errorCode = error.code;

  //   if (errorCode === 'auth/email-already-in-use') {
  //     isUserExist(true);
  //   }
  // }
};
