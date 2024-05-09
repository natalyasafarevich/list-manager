import {FC, useEffect, useState} from 'react';
import firebaseApp from '@/firebase';
import {ResetDataUser} from '@/store/data-user/actions';
import {
  EmailAuthProvider,
  User,
  getAuth,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {useRouter} from 'next/navigation';
import {getDatabase, ref, set, update} from 'firebase/database';
import PopupMessage from '@/components/PopupMessage/PopupMessage';
import './DeleteAccount.scss';

const DeleteAccount: FC = () => {
  const [users, setUsers] = useState<any>({});
  const [error, setError] = useState('');
  const auth = getAuth(firebaseApp);
  const [isDelete, setIsDelete] = useState(false);
  const [newUsers, setNewUsers] = useState<any>(null);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const user_data = useSelector((state: RootState) => state.userdata);

  const dispatch = useDispatch();
  const db = getDatabase(firebaseApp);
  const user = auth.currentUser;
  const router = useRouter();

  // getting all users
  useEffect(() => {
    fetchBackDefaultData('users', setUsers);
  }, []);

  // post new users
  useEffect(() => {
    if (newUsers && user_data.uid) {
      set(ref(db, 'users/'), newUsers);
    }
  }, [newUsers]);

  const deleteAccount = () => {
    const updatedUsers = {...users};
    delete updatedUsers[user_data.uid];
    setNewUsers(updatedUsers);

    const credential = EmailAuthProvider.credential(data.email, data.password);
    // if email and password are right,  delete account
    reauthenticateWithCredential(user as User, credential)
      .then(() => {
        user
          ?.delete()
          .then(() => {
            setData({email: '', password: ''});
            dispatch(ResetDataUser());
            setIsDelete(true);
            setTimeout(() => {
              router.push('/');
            }, 4000);
          })
          .catch((error) => {
            console.log(error.code);
          });
      })
      .catch(() => {
        setError('Email or password is invalid ');
      });
  };
  return (
    <div className='delete-account'>
      {isDelete && (
        <PopupMessage
          title='Your account has been deleted'
          messageType='success'
          message='In a few seconds you will be redirected to the main page'
        />
      )}
      <div className='delete-account__container'>
        <p className='delete-account__title'>Delete the account</p>
        <div className='delete-account__box'>
          <label className='delete-account__label' htmlFor='Email'>
            Please, write your email and password
          </label>
          <input
            id='Email'
            type='text'
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({...prev, email: e.target.value}))
            }
            placeholder='Email*'
            className='default-input delete-account__input'
          />

          <input
            id='Password'
            type='password'
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({...prev, password: e.target.value}))
            }
            placeholder='Password*'
            className='default-input delete-account__input'
          />
          <p className='text-error'>{error}</p>
        </div>

        <p className='text-error delete-account__error'>
          Deleting your account is permanent and cannot be undone. Please make
          sure that you have saved any important data before proceeding. If you
          have any doubts, you can always cancel the deletion process.
        </p>
        <button onClick={deleteAccount} className='delete-account__button'>
          Delete Account
        </button>
      </div>
    </div>
  );
};
export default DeleteAccount;
