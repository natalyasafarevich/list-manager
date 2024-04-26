import firebaseApp from '@/firebase';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import useUserPhotos from '@/hooks/useUserPhotos';
import {getUpdatePhoto} from '@/store/data-user/actions';
import {AppDispatch, RootState} from '@/store/store';
import {getAuth} from 'firebase/auth';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './ChangePhoto.scss';
interface ChangePhotoProps {
  uploadedPhoto?: (img: string) => void;
}
const ChangePhoto: FC<ChangePhotoProps> = ({uploadedPhoto}) => {
  const [file, setFile] = useState<any>(null);
  const [photo, setPhoto] = useState<any>();
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(
    'An error occurred while loading profile photo',
  );
  const user = useSelector((state: RootState) => state.userdata);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target as any).files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    setIsUploaded(false);
    console.log(file.type);
    if (!file.type.startsWith('image/')) {
      setError(
        `The selected file is not an image or has an unsupported format. 
        Please choose a file in the following formats: JPG, PNG, GIF, BMP, TIFF, or WebP.`,
      );
      return;
    }
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_photos/${user.uid}/avatar/main-photo.jpg`,
      );
      setError('');
      uploadBytes(storageRef, file)
        .then(() => {
          setIsUploaded(true);
          profileUpdate(user.uid, {
            photoURL: photo?.url,
          });
        })
        .catch((error) => {
          setIsUploaded(false);
          setError('An error occurred while loading profile photo');
        });
    }
  };

  const {photos} = useUserPhotos(
    `profile_photos/${user.uid}`,
    isUploaded,
    '/avatar',
  );
  const [currentImg, setCurrentImg] = useState<any>();
  useEffect(() => {
    if (photos[0]) {
      updateUserData(user.uid, {mainPhoto: photos[0]});
    }
  }, [photos]);

  useEffect(() => {
    setPhoto(photos[0]);
    user && fetchBackDefaultData(`users/${user.uid}/mainPhoto/`, setCurrentImg);
  }, [photos, photo, isUploaded]);

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);
  console.log(currentImg);
  return (
    <div className='change-photo'>
      <input
        id='photo'
        type='file'
        className='change-photo__input'
        onChange={handleChange}
      />
      <label htmlFor='photo' className='change-photo__label'>
        <span
          className='change-photo__img'
          style={{
            background: `center/cover no-repeat url(${currentImg?.url || user.photoURL})`,
          }}
        ></span>
      </label>
      <span className='text-error change-photo__error'>{error}</span>
    </div>
  );
};

export default ChangePhoto;
