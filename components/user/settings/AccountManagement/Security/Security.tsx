import {FC} from 'react';
import useEmailVerification from '@/hooks/useEmailVerification';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getAuth, EmailAuthProvider} from 'firebase/auth';
import firebaseApp from '@/firebase';
import NewPassword from './NewPassword/NewPassword';
import DeleteAccount from './DeleteAccount/DeleteAccount';
// import {EmailAuthProvider} from 'firebase/auth/cordova';

const Security: FC = () => {
  const isVerified = useEmailVerification();
  const auth = getAuth(firebaseApp);
  const users = auth.currentUser;
  console.log(users);
  // const credential = EmailAuthProvider.credential(users.email, 'currentPassword');
  const user = useSelector((state: RootState) => state.userdata.current_info);
  return (
    <div className='d-flex flex-md-column align-items-center w-100'>
      <h1>Безопасность</h1>
      {/* <div>
        {isVerified === true && <p>Email подтвержден</p>}
        {isVerified === false && <p>Email не подтвержден</p>}
        {isVerified === null && <p>Проверка статуса...</p>}
      </div> */}
      {/* {isVerified ? (
        <div className='alert alert-success'>
          <p>Текущий адрес электронной почты</p>

          <p> Ваш текущий адрес электронной почты:{user.email}</p>
        </div>
      ) : (
        <div className='alert alert-warning' role='alert'>
          Чтобы управлять настройками аккаунта, подтвердите свой адрес
          электронной почты.
        </div>
      )} */}

      <div className='alert alert-success'>
        <p>Текущий адрес электронной почты</p>

        <p> Ваш текущий адрес электронной почты:{user?.email}</p>
      </div>
      {/* <h2>Изменить пароль</h2>
      <span>
        При изменении пароля вы останетесь в системе на этом устройстве, но,
        возможно, выйдете из системы на других устройствах.
      </span> */}
      <NewPassword />
      <DeleteAccount />
    </div>
  );
};

export default Security;
