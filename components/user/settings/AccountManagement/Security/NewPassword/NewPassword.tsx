import firebaseApp from '@/firebase';
import {getAuth, signInWithPopup, updatePassword} from 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth/cordova';
import {FC, useState} from 'react';

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

  const auth = getAuth(firebaseApp);

  const user = auth.currentUser;

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      updatePassword(user, value)
        .then(() => {
          alert('Update successful');
          setError('');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/weak-password': {
              setError('Weak password');
              break;
            }
            case 'auth/requires-recent-login': {
              googleSignIn(); // Вызываем повторную аутентификацию через Google
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
    <form className='w-50 m-auto mb-5' onSubmit={handlerSubmit}>
      <p>
        При изменении пароля вы останетесь в системе на этом устройстве, но,
        возможно, выйдете из системы на других устройствах.
      </p>
      <div className='d-flex justify-content-center'>
        {error && <p>{error}</p>}
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button type='submit' className='btn btn-light'>
          submit
        </button>
      </div>
    </form>
  );
};
export default NewPassword;
