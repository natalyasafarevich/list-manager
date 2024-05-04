import {FC, useState} from 'react';
import firebaseApp from '@/firebase';
import {getAuth, updatePassword} from 'firebase/auth';
import PopupMessage from '@/components/PopupMessage/PopupMessage';
import './ChangingPassword.scss';

interface ValuesProps {
  password: string;
  confirmPassword: string;
}

const ChangingPassword: FC = () => {
  const [values, setValues] = useState<ValuesProps>({
    password: '',
    confirmPassword: '',
  });

  const reset = () => {
    setNotification((prev) => ({
      ...prev,
      isOpen: false,
      type: '',
      message: '',
      text: '',
    }));
    setValues({password: '', confirmPassword: ''});
  };

  const [passwordConfig, setPasswordConfig] = useState({
    typeIsText_1: false,
    typeIsText_2: false,
    isShow_1: false,
    isShow_2: false,
  });

  const [error, setError] = useState<string>('');
  const [notification, setNotification] = useState({
    message: '',
    text: '',
    type: '',
    isOpen: false,
  });

  const auth = getAuth(firebaseApp);

  const user = auth.currentUser;

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError('Passwords don`t match');
      return;
    }
    if (!values.password.length) {
      setError('The input fields cannot be empty');
      return;
    }
    reset();
    if (user) {
      updatePassword(user, values.password)
        .then(() => {
          setError('');
          setNotification((prev) => ({
            ...prev,
            isOpen: true,
            type: 'success',
            message: 'Change password',
            text: 'Your password has been updated',
          }));
          setTimeout(() => {
            reset();
          }, 4000);
        })

        .catch((error) => {
          switch (error.code) {
            case 'auth/weak-password': {
              setError('Weak password');
              break;
            }
            case 'auth/requires-recent-login': {
              setError('Log in again');
              break;
            }
            default: {
              setError('Unknown error occurred');
            }
          }
        });
    }
  };

  return (
    <form className='changing-password' onSubmit={handlerSubmit}>
      {notification.isOpen && (
        <PopupMessage
          title={notification.message}
          message={notification.text}
          messageType={notification.type}
        />
      )}
      <p className='changing-password__title '>
        <span className='text-underline'> Change password</span>
        *If you want to change your password, your last login to the system must
        have been today. If this is not the case and your last login was
        earlier, please log out first and then log in again to set a new
        password.
      </p>

      <div className='changing-password__box'>
        <label className='changing-password__label' htmlFor='changing-password'>
          New password
        </label>
        <input
          placeholder='Password'
          id='changing-password'
          className='default-input changing-password__input'
          type={!passwordConfig.typeIsText_1 ? 'password' : 'text'}
          value={values.password}
          onChange={(e) =>
            setValues((prev) => ({...prev, password: e.target.value}))
          }
        />
        <button
          type='button'
          className={`changing-password__icon ${values.password ? 'show' : ''} ${passwordConfig.isShow_1 ? 'active' : ''}`}
          onClick={(_e) => {
            setPasswordConfig((prev) => ({
              ...prev,
              isShow_1: !passwordConfig.isShow_1,
              typeIsText_1: !passwordConfig.typeIsText_1,
            }));
          }}
        ></button>
      </div>
      <div className='changing-password__box'>
        <input
          placeholder='Confirm password'
          id='confirm-password'
          className='default-input changing-password__input'
          type={!passwordConfig.isShow_2 ? 'password' : 'text'}
          value={values.confirmPassword}
          onChange={(e) =>
            setValues((prev) => ({...prev, confirmPassword: e.target.value}))
          }
        />
        <button
          type='button'
          className={`changing-password__icon ${values.confirmPassword ? 'show' : ''} ${passwordConfig.isShow_2 ? 'active' : ''}`}
          onClick={(e) => {
            setPasswordConfig((prev) => ({
              ...prev,
              isShow_2: !passwordConfig.isShow_2,
              typeIsText_2: !passwordConfig.typeIsText_2,
            }));
          }}
        ></button>
      </div>
      {error && <p className='text-error'>{error}</p>}

      <button type='submit' className='button-dark changing-password__button'>
        Submit
      </button>
    </form>
  );
};
export default ChangingPassword;
