import firebaseApp from '@/firebase';
import {profileUpdate} from '@/helper/updateProfile';
import useUserPhotos from '@/hooks/useUserPhotos';
import {RootState} from '@/store/store';
import {getAuth} from 'firebase/auth';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

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
  const {photos, loading, error} = useUserPhotos(user.uid, isUploaded);
  useEffect(() => {
    setPhoto(photos[0]);
  }, [photos, photo]);
  return (
    <div className='container '>
      <h3 className='text-secondary'>Загрузка новой фотографии</h3>
      <img
        src={photo?.url ? photo.url : user.photoURL}
        alt=''
        width={100}
        height={100}
      />
      <input type='file' onChange={handleChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default ChangePhoto;
