'use state';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import CreateCard from './CreateCard/CreateCard';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import Card from './Card/Card';
type ColumnProps = {
  item?: {id?: string; cards: Array<any>};
  name?: string;
};
const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isClose, setIsClose] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);
  
  useEffect(() => {
    setCards(item?.cards);
  }, [item]);


  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata);
  // const current_column = useSelector((state: RootState) => state.column);

  const current_board = useSelector((state: RootState) => state?.boards);

  // useEffect(() => {
  //   console.log(current_board);
  // }, [current_board]);

  // // console.log(dataId, 'id');
  useEffect(() => {
    if (isSave) {
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${cardIndex}`,
        {cards},
      );
      dispatch(
        getColumnInfo({
          id: item?.id,
          cards: cards,
        }),
      );
    }
    setIsSave(false);
  }, [isSave]);

  // console.log(<car></car>dIndex);
  return (
    <div
      className='m-2 border rounded p-3 bg-light text-dark '
      data-id={item?.id}
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
          listId={item?.id as string}
          setCardIndex={(e) => setCardIndex(e)}
        />
      ) : (
        <div>
          <div className='mb-2'>
            {cards?.map((itedm: any, i: any) => {
              // console.log(itedm);
              return (
                <div key={i}>
                  {' '}
                  <Card />
                </div>
              );
            })}
          </div>
          <button type='button' onClick={(e) => setIsClose(false)}>
            добавить карточку
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;
