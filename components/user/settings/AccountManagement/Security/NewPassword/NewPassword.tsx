import firebaseApp from '@/firebase';
import {getAuth, signInWithPopup, updatePassword} from 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth/cordova';
import {FC, useEffect, useRef, useState} from 'react';

//!! НАСТРОИТЬ, НЕ  РАБОТАЕТ
const googleSignIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Google Sign In:', user);
    // После успешной аутентификации выполните необходимые операции, например, обновление пароля
    // updatePassword(user, newPassword);
  } catch (error: any) {
    // Обработка ошибок аутентификации
    console.error('Google Sign In Error:', error.code, error.message);
  }
};

const NewPassword: FC = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);

  let inputRef = useRef<any>(null);
  const auth = getAuth(firebaseApp);

  const user = auth.currentUser;

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      updatePassword(user, value)
        .then(() => {
          setError('');
          setSuccess('password has been changed');
          setValue('');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/weak-password': {
              setError('Weak password');
              setSuccess('');
              break;
            }
            case 'auth/requires-recent-login': {
              googleSignIn();
              setSuccess(''); // Вызываем повторную аутентификацию через Google
              break;
            }
            default: {
              setError('Unknown error occurred');
              setSuccess('');
            }
          }
        });
    }
  };

  return (
    <form className='w-50 m-auto mb-5' onSubmit={handlerSubmit}>
      <p>
        При изменении пароля вы останетесь в системе на этом устройстве, но,
        возможно, выйдете из системы на других устройствах.
      </p>
      <div className='d-flex justify-content-center'>
        {error && <p className='alert alert-danger'>{error}</p>}
        {success && <p className='alert alert-success'>{success}</p>}
        <input
          ref={inputRef}
          type={isPassword ? 'password' : 'text'}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button
          type='button'
          onClick={(e) => {
            setIsPassword(!isPassword);
          }}
        >
          see the password
        </button>
        <button type='submit' className='btn btn-light'>
          submit
        </button>
      </div>
    </form>
  );
};
export default NewPassword;
