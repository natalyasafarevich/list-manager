'use state';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import CreateCard from './CreateCard/CreateCard';
import {profileUpdate} from '@/helper/updateProfile';
import {updateUserData} from '@/helper/updateUserData';
import CardDisplay from './CardDisplay/CardDisplay';
import ColumnSettings from './ColumnSettings/ColumnSettings';
import NameWithSettingsButton from './NameWithSettingsButton/NameWithSettingsButton';

type ColumnProps = {
  item?: {id?: string; cards: Array<any>};
  name?: string;
};
const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isClose, setIsClose] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!item?.cards) {
      return;
    }
    setCards(item?.cards);
  }, [item]);

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

  return (
    <div
      className='m-2 border rounded p-3 bg-light text-dark position-relative '
      data-id={item?.id}
    >
      <NameWithSettingsButton name={name} />
      {/* <div className=''>
        <b>{name}</b>
        <button className='btn btn-dark'>...</button>
      </div> */}
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
            {cards?.map((card: any, i: any) => {
              return (
                <div key={i}>
                  <CardDisplay card={card} />
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
