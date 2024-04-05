import {fetchBackDefaultData, getDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isCover} from '@/store/card-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Inner: FC = () => {
  const [cover, setCover] = useState<Array<string>>([]);
  useEffect(() => {
    fetchBackDefaultData('/card-cover', setCover);
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  const {uid, dataLink} = user;
  const changeCover = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;

    updateFirebaseData(
      `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}`,
      {
        cover: currentTarget.dataset.color,
      },
    );
    dispatch(isCover(true));
  };
  return (
    <div>
      <div className='d-flex mt-2 mb-2'>
        {cover?.map((item, i) => (
          <button
            key={i}
            data-color={item}
            onClick={changeCover}
            style={{width: '50px', height: '40px', background: item}}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Inner;
