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
import './DeleteAccount.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData} from '@/helper/updateUserData';
import {useRouter} from 'next/navigation';

const DeleteAccount: FC = () => {
  const [users, setUsers] = useState<any>({});
  const [error, setError] = useState('');
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    fetchBackDefaultData('users', setUsers);
  }, []);
  const user = auth.currentUser;

  const user_data = useSelector((state: RootState) => state.userdata);
  console.log(user_data, 'start');
  const dispatch = useDispatch();
  //   var credential = EmailAuthProvider.credential(
  //     .email,
  //     userProvidedPassword
  // );
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const deleteAccount = () => {
    const credential = EmailAuthProvider.credential(data.email, data.password);

    reauthenticateWithCredential(user as User, credential)
      .then(() => {
        setError('');
        user
          ?.delete()
          .then(() => {
            const updatedUsers = {...users};
            delete updatedUsers[user_data.uid];
            updateFirebaseData('/users', updatedUsers);
            dispatch(ResetDataUser());
            router.push('/');
          })

          .catch((error) => {
            console.log(error.code);
          });
      })
      .catch(() => {
        setError('Email or password is invalid ');
      });
    // user
    //   ?.delete()
    //   .then(() => {
    //     alert('аккаунт успешно удален');
    //     dispatch(ResetDataUser());
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //   });
  };
  return (
    <div className='delete-account'>
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
