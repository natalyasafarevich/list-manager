import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {BackgroundImageBoard} from '@/types/interfaces';
import {getDatabase, ref, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
const bg = [
  {prop: `linear-gradient(90deg,#c4db43,#eada8a)`},
  {prop: `linear-gradient(90deg, #3d8c93,#5fcdca)`},
  {prop: `linear-gradient(90deg, #35c4fe,#623fd0)`},
  {prop: `linear-gradient(90deg, #ff9bd2,#fffacc)`},
  {prop: `linear-gradient(90deg, #f7cddb,#add2f1)`},
  {prop: `linear-gradient(90deg, #fafafa,#bababa)`},
  {prop: `linear-gradient(90deg, #93545e,#b26c6c,#d08779)`},
  {prop: `linear-gradient(90deg, #2dec97,#94e817,#fbee40)`},
  {prop: `linear-gradient(90deg, #000000,#636363)`},
];
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
  console.log(backgrounds);

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
          {backgrounds['background-colors']?.map((item: any) => (
            <div
              style={{
                width: 50,
                height: 50,
                background: item.prop,
              }}
            >
              {' '}
            </div>
          ))}
        </div>
      )}
      {isImages && (
        <div style={{height: 300, overflowX: 'hidden', overflowY: 'scroll'}}>
          {backgrounds['background-images']?.map((item, i) => (
            <img key={i} src={item.urls.small}></img>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBackground;
