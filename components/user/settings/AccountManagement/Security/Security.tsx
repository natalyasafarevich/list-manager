import {FC} from 'react';
import useEmailVerification from '@/hooks/useEmailVerification';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getAuth, EmailAuthProvider} from 'firebase/auth';
import firebaseApp from '@/firebase';
import ChangingPassword from './ChangingPassword/ChangingPassword';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import './Security.scss';
import EmailVerification from './EmailVerification/EmailVerification';
// import {EmailAuthProvider} from 'firebase/auth/cordova';

const Security: FC = () => {
  const auth = getAuth(firebaseApp);
  const user = useSelector((state: RootState) => state.userdata);
  return (
    <div className='security'>
      <div className='security__container'>
        <p className='security__title'>security</p>

        <div className='security__box'>
          <p className='security__text'>
            Email <span> {user?.email} </span> is <EmailVerification />
          </p>
        </div>
        <div className='security__box'>
          <ChangingPassword />
        </div>
      </div>{' '}
    </div>
  );
};

export default Security;
