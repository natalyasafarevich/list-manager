import {RootState} from '@/store/store';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const ChangePhoto = () => {
  const [file, setFile] = useState<any>(null);
  const userId = useSelector((state: RootState) => state.userdata.uid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target as any).files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_photos/${userId}/main-photo.jpg`,
      );

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log('Фотография профиля успешно загружена');
        })
        .catch((error) => {
          console.error(
            'Произошла ошибка при загрузке фотографии профиля:',
            error,
          );
        });
    }
  };

  return (
    <div>
      <h2>Загрузка новой фотографии</h2>
      <input type='file' onChange={handleChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default ChangePhoto;
