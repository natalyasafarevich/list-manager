import firebaseApp from '@/firebase';
import {getDataUser} from '@/store/data-user/actions';
import {RootState} from '@/store/store';
import {getAuth} from 'firebase/auth';
import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const DeleteAccount: FC = () => {
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();

  const user = auth.currentUser;

  const deleteUser = () => {
    let result = confirm('Удалить аккаунт? ');
    result &&
      user
        ?.delete()
        .then(() => {
          alert('аккаунт успешно удален');
          dispatch(getDataUser({}));
        })
        .catch((error) => {
          console.log(error.code);
        });
  };
  return (
    <div className=''>
      <h2>Удаление аккаунта</h2>
      <button onClick={deleteUser}> удалить аккаунт</button>
    </div>
  );
};
export default DeleteAccount;
