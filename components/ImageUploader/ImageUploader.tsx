import {updateFirebaseData} from '@/helper/updateUserData';
import useUserPhotos from '@/hooks/useUserPhotos';
import {RootState} from '@/store/store';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './ImageUploader.scss';
import FileUploadProgress from '../FileUploadProgress/FileUploadProgress';

const ImageUploader: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const boards = useSelector((state: RootState) => state.boards);
  // console.log(selectedFile);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const storage = getStorage();

    if (event.target.files) {
      const file = event.target.files[0];
      event.target.files && setSelectedFile(event.target.files[0]);
      if (file) {
        const storageRef = ref(storage, `boards/${boardIndex}/currentBg.jpg`);

        uploadBytes(storageRef, file)
          .then((snapshot) => {
            console.log(snapshot, 'snapshot');
            setIsUploaded(true);
          })
          .catch((error) => {
            setIsUploaded(false);
            alert('Произошла ошибка при загрузке фотографии профиля:');
          });
      }
    }
  };
  const {photos} = useUserPhotos(`boards/${boardIndex}`, isUploaded, '');

  useEffect(() => {
    if (isUploaded && photos[0]?.url) {
      updateFirebaseData(`boards/${boardIndex}`, {
        currentColor: '',
        currentBg: photos[0]?.url,
      });
      setIsUploaded(false);
    }
  }, [photos, isUploaded]);

  return (
    <div className='image-uploader'>
      <label
        htmlFor='file'
        className='image-uploader__container custom-file-container'
      >
        <span className='image-uploader__title'>Click to Upload</span>
        <input
          className='image-uploader__input'
          type='file'
          accept='image/*'
          id='file'
          onChange={handleImageChange}
        />
      </label>
      <div className='image-uploader__file'>
        <FileUploadProgress file={selectedFile} />
      </div>
    </div>
  );
};

export default ImageUploader;
