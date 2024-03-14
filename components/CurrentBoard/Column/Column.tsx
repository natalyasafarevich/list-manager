'use state';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import CreateCard from '../CreateCard/CreateCard';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
type ColumnProps = {
  name: string;
  dataId?: string;
};
const Column: FC<ColumnProps> = ({name, dataId}) => {
  const [isClose, setIsClose] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);

  // const s = useSelector((state: RootState) => state.column);
  // console.log(s, 'g');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  const current_column = useSelector((state: RootState) => state.column);

  const current_board = useSelector((state: RootState) => state?.boards);

  useEffect(() => {
    console.log(current_board);
  }, [current_board]);
  // console.log(dataId, 'id');
  useEffect(() => {
    if (isSave) {
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${cardIndex}`,
        {cards},
      );
      dispatch(
        getColumnInfo({
          id: dataId,
          cards: cards,
        }),
      );
    }
    setIsSave(false);
  }, [isSave]);

  console.log(cardIndex);
  return (
    <div
      className='m-2 border rounded p-3 bg-light text-dark '
      data-id={dataId}
    >
      <div className='d-flex w-100 justify-content-between'>
        <b>{name}</b>
        <button>set</button>
      </div>
      {!isClose ? (
        <CreateCard
          setCards={(e) => setCards(e)}
          setIsSave={(e) => setIsSave(e)}
          setIsClose={(e) => setIsClose(e)}
          listId={dataId as string}
          setCardIndex={(e) => setCardIndex(e)}
        />
      ) : (
        <button type='button' onClick={(e) => setIsClose(false)}>
          добавить карточку
        </button>
      )}
    </div>
  );
};

export default Column;
