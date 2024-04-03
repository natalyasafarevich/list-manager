import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {BackgroundImageBoard} from '@/types/interfaces';
import {getDatabase, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import Image from './Image/Image';
import Colors from './Color/Color';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import useUserPhotos from '@/hooks/useUserPhotos';
import {updateUserData} from '@/helper/updateUserData';

export interface BackgroundsProps {
  'background-images': Array<BackgroundImageBoard>;
  'background-colors': Array<{prop: string}>;
}
const ChangeBackground: FC = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [backgrounds, setBackgrounds] = useState<BackgroundsProps>({
    'background-images': [],
    'background-colors': [],
  });

  useEffect(() => {
    fetchBackDefaultData('/board', setBackgrounds);
  }, []);
  const db = getDatabase(firebaseApp);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.userdata);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    console.log(file, 'file');
    if (file) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_photos/${user.uid}/board/currentBg.jpg`,
      );

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log(snapshot);
          setIsUploaded(true);
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
  const {photos} = useUserPhotos(user.uid, isUploaded, 'board');
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  useEffect(() => {
    if (isUploaded && photos[0]?.url) {
      updateUserData(`${user.uid}/boards/${boardIndex}`, {
        currentColor: '',
        currentBg: photos[0]?.url,
      });
      setIsUploaded(false);
    }
  }, [photos, isUploaded]);

  return (
    <div className='p-2'>
      <div className='d-flex flex-wrap justify-content-between'>
        <button
          className='btn  btn-danger '
          onClick={(e) => {
            setIsImages(!isImages);
            setIsColors(false);
          }}
        >
          фотографии
        </button>
        <button
          className='btn  btn-secondary '
          onClick={(e) => {
            setIsImages(false);
            setIsColors(!isColors);
          }}
        >
          цвета
        </button>
        <div>
          <input type='file' accept='image/*' onChange={handleImageChange} />
        </div>
      </div>
      {isColors && (
        <div className='d-flex flex-wrap'>
          {backgrounds['background-colors']?.map((item, i) => (
            <Colors key={i} item={item} />
          ))}
        </div>
      )}
      {isImages && (
        <div style={{height: 300, overflowX: 'hidden', overflowY: 'scroll'}}>
          {backgrounds['background-images']?.map((item, i) => (
            <Image key={i} item={item}></Image>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBackground;
