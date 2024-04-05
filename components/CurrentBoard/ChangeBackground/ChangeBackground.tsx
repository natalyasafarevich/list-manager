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
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
const images = [
  {
    urls: 'https://images.unsplash.com/photo-1710032983278-10fc4f0191f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEwMjQ1MDkyfA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    urls: 'https://images.unsplash.com/photo-1710032983278-10fc4f0191f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEwMjQ1MDkyfA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    urls: 'https://images.unsplash.com/photo-1710032983278-10fc4f0191f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEwMjQ1MDkyfA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    urls: 'https://lh3.googleusercontent.com/a/ACg8ocLPXS3rdoDCxFswajaEfs50AMAXUwyqos8IJkEbzVCOo2B4XA=s96-c',
  },
];
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
    // updateFirebaseData('board-settings/', {'background-images': images});
    fetchBackDefaultData('board-settings/', setBackgrounds);
  }, []);
  const db = getDatabase(firebaseApp);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.userdata);
  const [isUploaded, setIsUploaded] = useState(false);
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    console.log(file, 'file');
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `boards/${boardIndex}/currentBg.jpg`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log(snapshot, 'snapshot');
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
  const {photos} = useUserPhotos(`boards/${boardIndex}`, isUploaded, '');
  // console.log(photos);
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
