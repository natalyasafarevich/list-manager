import ChangePhoto from '@/components/user/ChangePhoto/ChangePhoto';
import {RootState} from '@/store/store';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const ProfileVisibility = () => {
  // const [file, setFile] = useState<any>(null);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = (e.target as any).files[0];
  //   console.log(selectedFile);
  //   setFile(selectedFile);
  // };
  // const userId = useSelector((state: RootState) => state.userdata.uid);
  // const handleUpload = () => {
  //   if (file) {
  //     const storage = getStorage();
  //     const storageRef = ref(storage, `profile_photos/${userId}/photo.jpg`);

  //     uploadBytes(storageRef, file)
  //       .then((snapshot) => {
  //         console.log('Фотография профиля успешно загружена');
  //       })
  //       .catch((error) => {
  //         console.error(
  //           'Произошла ошибка при загрузке фотографии профиля:',
  //           error,
  //         );
  //       });
  //   }
  // };

  return (
    <div>
      {/* <input type='file' onChange={handleChange} /> */}
      {/* <button onClick={handleUpload}>Загрузить</button> */}
      <ChangePhoto />
    </div>
  );
};

export default ProfileVisibility;
