import {RootState} from '@/store/store';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  UserInfo,
  getAuth,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import {getDatabase, ref, onValue, set, update} from 'firebase/database';

import firebaseApp from '@/firebase';
import {profileUpdate} from '@/helper/updateProfile';
import {createdBoard} from '@/variables/variables';
async function writeUserData(userId: string, params: any) {
  const db = getDatabase(firebaseApp);
  try {
    await update(ref(db, 'users/' + userId), params);
    console.log('Data successfully written');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}
const ProfileInformation = () => {
  // const [name, setName] = useState<string>('');
  const user = useSelector((state: RootState) => state.userdata);
  const [generalInfo, setGeneralInfo] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    uid: user.uid || '',
    photoURL: '',
    public_name: '',
  });
  console.log(generalInfo);
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    if (user.displayName) {
      setGeneralInfo((prev) => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        uid: user.uid,
        photoURL: user.photoURL || '',
      }));
    }
  }, [user]);
  const db = getDatabase(firebaseApp);
  useEffect(() => {
    if (user) {
      writeUserData(user.uid, {public_name: 'f', company: 'ff'});
      // writeUserData(
      //   user.uid,
      //   user.displayName as string,
      //   user.email as string,
      //   user.phoneNumber as string,
      //   createdBoard,
      // );
    }
    // чтение данных
    const db = getDatabase(firebaseApp);
    const starCountRef = ref(db, 'users/' + user.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }, [user]);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileUpdate(auth, {
      displayName: generalInfo.displayName,
    });
  };
  // useEffect(() => {
  //   if (auth?.currentUser)
  //     sendEmailVerification(auth.currentUser).then(() => {
  //       console.log('gggg');
  //       // ...
  //     });
  // }, []);
  //обновление email (нельзя без подтверждения email)

  // }

  return (
    <form onSubmit={handleSubmit}>
      <div className=''>
        <label htmlFor='name'>Полное имя</label>
        <input
          type='text'
          id='name'
          value={generalInfo.displayName}
          onChange={(e) =>
            setGeneralInfo((prevState) => ({
              ...prevState,
              displayName: e.target.value,
            }))
          }
        />
      </div>
      <div className=''>
        <label htmlFor='public-name'>Публичное имя</label>
        <input
          type='text'
          id='public-name'
          value={generalInfo.public_name}
          onChange={(e) =>
            setGeneralInfo((prevState) => ({
              ...prevState,
              public_name: e.target.value,
            }))
          }
        />
      </div>

      <div className=''>
        <label htmlFor='phone'>email</label>
        <input
          type='text'
          id='phone'
          readOnly
          value={generalInfo.email}
          onChange={(e) =>
            setGeneralInfo((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </div>
      <div className=''>
        <label htmlFor='uid'>uid</label>
        <input type='text' id='uid' readOnly value={generalInfo.uid} />
      </div>

      <button className='btn  btn-info' type='submit'>
        save all setings
      </button>
    </form>
  );
};
export default ProfileInformation;
