import firebaseApp from '@/firebase';
import {fetchBackData} from '@/helper/getFirebaseData';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import useUserPhotos from '@/hooks/useUserPhotos';
import {getUpdatePhoto} from '@/store/data-user/actions';
import {AppDispatch, RootState} from '@/store/store';
import {getAuth} from 'firebase/auth';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './ChangePhoto.scss';

const ChangePhoto = () => {
  const [file, setFile] = useState<any>(null);
  const [photo, setPhoto] = useState<any>();
  const [isUploaded, setIsUploaded] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target as any).files[0];
    setFile(selectedFile);
  };
  const auth = getAuth(firebaseApp);
  const handleUpload = () => {
    setIsUploaded(false);
    console.log(file);
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_photos/${user.uid}/avatar/main-photo.jpg`,
      );

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          setIsUploaded(true);
        })
        .catch((error) => {
          setIsUploaded(false);
          console.error(
            'Произошла ошибка при загрузке фотографии профиля:',
            error,
          );
        });
      profileUpdate(user.uid, {
        photoURL: photo?.url,
      });
    }
  };
  const dispatch: AppDispatch = useDispatch();
  const {photos} = useUserPhotos(
    `profile_photos/${user.uid}`,
    isUploaded,
    '/avatar',
  );
  useEffect(() => {
    if (photos[0]) {
      updateUserData(user.uid, {mainPhoto: photos[0]});
      console.log(photos[0].url);
      // dispatch(getUpdatePhoto(photos[0].url));
    }
  }, [photos]);
  useEffect(() => {
    setPhoto(photos[0]);
  }, [photos, photo]);
  return (
    <div className='change-photo'>
      {/* <div
        className='change-photo__img'
        style={{background: `url(${photo?.url ? photo.url : user.photoURL})`}}
      ></div> */}
      <label
        htmlFor='photo'
        className='image-uploader__container custom-file-container'
      ></label>
      <input id='photo' type='file' onChange={handleChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default ChangePhoto;
