import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {BackgroundImageBoard} from '@/types/interfaces';
import {FC, useEffect, useState} from 'react';
import Image from './Image/Image';
import Colors from './Color/Color';
import './ChangeBackground.scss';
import ImageUploader from '@/components/ImageUploader/ImageUploader';

export interface BackgroundsProps {
  'background-images': Array<BackgroundImageBoard>;
  'background-colors': Array<string>;
}

const ChangeBackground: FC = () => {
  const [isImages, setIsImages] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [backgrounds, setBackgrounds] = useState<BackgroundsProps>({
    'background-images': [],
    'background-colors': [],
  });

  useEffect(() => {
    fetchBackDefaultData('board-settings/', setBackgrounds);
  }, []);

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
        <div className='change-background__item'>
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
