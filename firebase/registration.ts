import firebaseApp from '@/firebase';
import {createUserWithEmailAndPassword, getAuth, AuthError, updateProfile} from 'firebase/auth';

export const isUserExist = (a: boolean) => {
  return a;
};

export const handleRegister = async (email: string, password: string, username: string) => {
  // try {
  const auth = getAuth(firebaseApp);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: username,
  });

  return user;
};
