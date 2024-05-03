import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import useUserPhotos from '@/hooks/useUserPhotos';
import {AppDispatch, RootState} from '@/store/store';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './ChangePhoto.scss';
import {useDispatch} from 'react-redux';
import {isUserUpdated} from '@/store/data-user/actions';

const ChangePhoto: FC = () => {
  const [error, setError] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [currentImg, setCurrentImg] = useState<any>();

  const [photo, setPhoto] = useState<any>();

  const user = useSelector((state: RootState) => state.userdata);
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target as any).files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    setIsUploaded(false);

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

          profileUpdate(`${user.uid}/additional-info/mainPhoto`, photo?.url);
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

  useEffect(() => {
    if (photos[0] && isUploaded) {
      dispatch(isUserUpdated(true));
      updateUserData(`${user.uid}/additional-info/mainPhoto`, photos[0]);
    }
  }, [photo, isUploaded]);
  useEffect(() => {
    setPhoto(photos[0]);
  }, [photos]);

  useEffect(() => {
    setPhoto(photos[0]);
    user &&
      fetchBackDefaultData(
        `users/${user.uid}/additional-info/mainPhoto/`,
        setCurrentImg,
      );
  }, [isUploaded, user, photo]);

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

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
            background: `center/cover no-repeat url(${currentImg?.url || '/default-image.svg'})`,
          }}
        ></span>
      </label>
      <span className='text-error change-photo__error'>{error}</span>
    </div>
  );
};

export default ChangePhoto;
