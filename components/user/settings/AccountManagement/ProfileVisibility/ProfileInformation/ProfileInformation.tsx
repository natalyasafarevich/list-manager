import {RootState} from '@/store/store';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set, update} from 'firebase/database';
import firebaseApp from '@/firebase';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import {geLocation} from '@/helper/geLocation';

const ProfileInformation = () => {
  const user = useSelector((state: RootState) => state.userdata);
  const [userLocation, setUserLocation] = useState();
  const [time, setTime] = useState('');
  const date = new Date();
  useEffect(() => {
    setTime(`${date.getHours()}:${date.getMinutes()}`);
  }, [date.getHours(), date.getMinutes()]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          let location = geLocation(latitude, longitude);
          location.then((data) => setUserLocation(data.address.country));
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error.message);
        },
      );
    } else {
      console.error('Геолокация не поддерживается вашим браузером');
    }
  }, []);
  const [updateInfo, setUpdateInfo] = useState({
    public_name: '',
    position: '',
    organization: '',
    localTime: '',
    location: '',
  });

  useEffect(() => {
    if (user.uid) {
      // }
      const starCountRef = ref(db, 'users/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // получение данных юзера
        if (data) {
          setUpdateInfo({
            public_name: data.public_name || '',
            position: data.position || '',
            organization: data.organization || '',
            localTime: data.localTime || '',
            location: data.location || '',
          });
        }
      });
    }
  }, [user, user.uid]);

  const [generalInfo, setGeneralInfo] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    uid: user.uid || '',
    photoURL: '',
  });
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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserData(user.uid, updateInfo);
    profileUpdate(auth, {
      displayName: generalInfo.displayName,
    });
    alert('данные успешно  обновлены');
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
    <form onSubmit={handleSubmit} className='container'>
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
          value={updateInfo.public_name}
          onChange={(e) =>
            setUpdateInfo((prevState) => ({
              ...prevState,
              public_name: e.target.value,
            }))
          }
        />
      </div>
      <div className=''>
        <label htmlFor='position'>Должность</label>
        <input
          type='text'
          id='position'
          value={updateInfo.position}
          onChange={(e) =>
            setUpdateInfo((prevState) => ({
              ...prevState,
              position: e.target.value,
            }))
          }
        />
      </div>
      <div className=''>
        <label htmlFor='organization'>Организация</label>
        <input
          type='text'
          id='organization'
          value={updateInfo.organization}
          onChange={(e) =>
            setUpdateInfo((prevState) => ({
              ...prevState,
              organization: e.target.value,
            }))
          }
        />
      </div>
      <div className=''>
        <label htmlFor='location'>Расположение</label>
        <input
          type='text'
          id='location'
          value={userLocation ? userLocation : ''}
          readOnly
        />
      </div>
      <div className=''>
        <label htmlFor='time'>Местное время</label>
        <input type='text' id='time' readOnly value={time ? time : ''} />
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
