import fetchUserPhotos from '@/helper/fetchUserPhotos';
import useUserPhotos from '@/hooks/useUserPhotos';
import {RootState} from '@/store/store';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const ChangePhoto = () => {
  const [file, setFile] = useState<any>(null);
  const [photo, setPhoto] = useState<any>();
  const [isUploaded, setIsUploaded] = useState(false);

  const userId = useSelector((state: RootState) => state.userdata.uid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target as any).files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const handleUpload = () => {
    setIsUploaded(false);
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_photos/${userId}/avatar/main-photo.jpg`,
      );

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          setIsUploaded(true);
          console.log('Фотография профиля успешно загружена');
        })
        .catch((error) => {
          setIsUploaded(false);
          console.error(
            'Произошла ошибка при загрузке фотографии профиля:',
            error,
          );
        });
    }
  };
  const {photos, loading, error} = useUserPhotos(userId, isUploaded);
  useEffect(() => {
    setPhoto(photos[0]);
    console.log(photo);
  }, [photos, photo]);
  return (
    <div className='container'>
      <h2>Загрузка новой фотографии</h2>
      {photo?.url && <img src={photo?.url} alt='' width={100} height={100} />}
      <input type='file' onChange={handleChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default ChangePhoto;
