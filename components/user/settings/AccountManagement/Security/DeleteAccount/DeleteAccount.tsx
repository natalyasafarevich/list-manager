import {FC, useState} from 'react';
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
function promptForCredentials() {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');
  return EmailAuthProvider.credential(email as string, password as string);
}
const DeleteAccount: FC = () => {
  const [error, setError] = useState('');
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  console.log(user, 'useruser');
  //   var credential = EmailAuthProvider.credential(
  //     .email,
  //     userProvidedPassword
  // );

  const deleteUser = () => {
    let result = confirm('Удалить аккаунт? ');
    const credential = promptForCredentials();
    console.log(credential);
    result &&
      reauthenticateWithCredential(user as User, credential)
        .then(() => {
          setError('');
          console.log('dccsd');
        })
        .catch((error: any) => {
          setError('Email or password is invalid ');
          // An error ocurred
          // ...
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
            placeholder='Email*'
            className='default-input delete-account__input'
          />

          <input
            id='Password'
            type='password'
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
        <button onClick={deleteUser} className='delete-account__button'>
          Delete Account
        </button>
      </div>
    </div>
  );
};
export default DeleteAccount;
