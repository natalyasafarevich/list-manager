import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {getDatabase} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import Image from './Image/Image';
import Colors from './Color/Color';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import useUserPhotos from '@/hooks/useUserPhotos';
import {BackgroundsProps} from './ChangeBackground';

export const ChangeBackground: FC = () => {
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
          // setIsUploaded(false);
          console.error(
            'Произошла ошибка при загрузке фотографии профиля:',
            error,
          );
        });
      // profileUpdate(user.uid, {
      //   photoURL: photo?.url,
      // });
    }
  };
  const {photos} = useUserPhotos(user.uid, isUploaded, 'board');
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
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
          {/* {selectedImage && (
              <div>
                <p>Изображение загружено:</p>
                <img src={selectedImage} alt='Загруженное изображение' />
              </div>
            )} */}
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
