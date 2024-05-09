import {fetchBackDefaultData, getDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isCardUpdate, isCover} from '@/store/card-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Inner.scss';

const Inner: FC = () => {
  const [cover, setCover] = useState<Array<string>>([]);
  useEffect(() => {
    fetchBackDefaultData('/card-cover', setCover);
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  const {dataLink} = user;
  const changeCover = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;

    updateFirebaseData(
      `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}`,
      {
        cover: currentTarget.dataset.color,
      },
    );
    dispatch(isCardUpdate(true));
  };
  return (
    <div className='cover-inner'>
      <div className='flex cover-inner__row '>
        {cover?.map((item, i) => (
          <button
            key={i}
            className='cover-inner__item'
            data-color={item}
            onClick={changeCover}
            style={{background: item}}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Inner;
