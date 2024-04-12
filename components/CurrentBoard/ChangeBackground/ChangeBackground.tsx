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
import {updateFirebaseData} from '@/helper/updateUserData';
import './ChangeBackground.scss';
import ImageUploader from '@/components/ImageUploader/ImageUploader';

export interface BackgroundsProps {
  'background-images': Array<BackgroundImageBoard>;
  'background-colors': Array<{prop: string}>;
}
const ChangeBackground: FC = () => {
  // console.log(selectedFile);
  const [isImages, setIsImages] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [backgrounds, setBackgrounds] = useState<BackgroundsProps>({
    'background-images': [],
    'background-colors': [],
  });

  useEffect(() => {
    fetchBackDefaultData('board-settings/', setBackgrounds);
  }, []);

  // const handleImageChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const file = event.target.files && event.target.files[0];
  //   event.target.files && setSelectedFile(event.target.files[0]);
  //   if (file) {
  //     const storage = getStorage();
  //     const storageRef = ref(storage, `boards/${boardIndex}/currentBg.jpg`);

  //     uploadBytes(storageRef, file)
  //       .then((snapshot) => {
  //         console.log(snapshot, 'snapshot');
  //         setIsUploaded(true);
  //       })
  //       .catch((error) => {
  //         setIsUploaded(false);
  //         console.error(
  //           'Произошла ошибка при загрузке фотографии профиля:',
  //           error,
  //         );
  //       });
  //   }
  // };
  // const {photos} = useUserPhotos(`boards/${boardIndex}`, isUploaded, '');

  // useEffect(() => {
  //   if (isUploaded && photos[0]?.url) {
  //     updateFirebaseData(`boards/${boardIndex}`, {
  //       currentColor: '',
  //       currentBg: photos[0]?.url,
  //     });
  //     setIsUploaded(false);
  //   }
  // }, [photos, isUploaded]);

  return (
    <div className='change-background'>
      <div className='change-background__container '>
        <div className='change-background__box flex'>
          <p
            className='change-background__tab underline'
            onClick={(e) => {
              setIsImages(!isImages);
              setIsColors(false);
            }}
          >
            Images
          </p>
          <p
            className='change-background__tab underline'
            onClick={(e) => {
              setIsImages(false);
              setIsColors(!isColors);
            }}
          >
            Colors
          </p>
        </div>
        <ImageUploader />
      </div>
      {isColors && (
        <div className='d-flex flex-wrap'>
          {backgrounds['background-colors']?.map((item, i) => (
            <Colors key={i} item={item} />
          ))}
        </div>
      )}
      {isImages && (
        <div className='change-background__item'>
          {backgrounds['background-images']?.map((item, i) => (
            <Image key={i} item={item}></Image>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBackground;
