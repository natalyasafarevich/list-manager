import firebaseApp from '@/firebase';
import useEmailVerification from '@/hooks/useEmailVerification';
import {RootState} from '@/store/store';
import {getAuth, signInWithEmailAndPassword, updateEmail} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Email = () => {
  const default_email = useSelector((state: RootState) => state.userdata.email);
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    setEmail(default_email as string);
  }, [default_email]);

  const isVerified = useEmailVerification();
  const auth: any = getAuth(firebaseApp);
  const changeEmail = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEmail(auth.currentUser, 'user@example.com')
      .then(() => {})
      .catch((error: any) => {
      });
  };
  return (
    <div className='d-flex justify-content-center w-100 mb-5'>
      <form onSubmit={changeEmail}>
        <h2 className=''>настроки email</h2>
        <br />
        <input type='text' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Email;
