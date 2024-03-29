import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {BackgroundImageBoard} from '@/types/interfaces';
import {getDatabase, ref, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import Image from './Image/Image';
import Colors from './Color/Color';

interface BackgroundsProps {
  'background-images': Array<BackgroundImageBoard>;
  'background-colors': Array<{prop: string}>;
}
const ChangeBackground: FC = () => {
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

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-between'>
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
            // <img key={i} src={item.urls.small}></img>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBackground;
