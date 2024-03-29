import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {BackgroundImageBoard} from '@/types/interfaces';
import {getDatabase, ref, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
const ChangeBackground: FC = () => {
  const [isImages, setIsImages] = useState(false);
  const [isColors, setIsColors] = useState(false);

  const [photos, setPhotos] = useState<Array<BackgroundImageBoard>>([]);
  useEffect(() => {
    fetchBackDefaultData('/board/background-images', setPhotos);
  }, []);
  const db = getDatabase(firebaseApp);
  useEffect(() => {
    console.log(photos);
  }, [photos]);
  return (
    <div className='p-2'>
      <div className='d-flex justify-content-between'>
        <button
          className='btn  btn-danger '
          onClick={(e) => setIsImages(!isImages)}
        >
          фотографии
        </button>
        <button className='btn  btn-secondary '>цвета</button>
      </div>

      {isImages && (
        <div style={{height: 300, overflowX: 'hidden', overflowY: 'scroll'}}>
          {photos.map((item, i) => (
            <img key={i} src={item.urls.small}></img>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBackground;
