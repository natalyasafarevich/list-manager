'use state';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {updateFirebaseData} from '@/helper/updateUserData';
import CreateCard from '../Card/CreateCard/CreateCard';
import CardDisplay from '../Card/CardDisplay/CardDisplay';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {ColumnCardsProps, CurrentColumnProps} from '@/types/interfaces';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {isCardUpdate} from '@/store/card-setting/actions';
import './Column.scss';

type ColumnProps = {
  item?: {id: string; isArchive: boolean; cards: Array<ColumnCardsProps>};
  name?: string;
};

const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [cards, setCards] = useState<ColumnCardsProps[]>([]);
  const [userData, getUserData] = useState<CurrentColumnProps>();
  const [isSave, setIsSave] = useState(false);
  const [isClose, setIsClose] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);

  const {isUpdate} = useSelector((state: RootState) => state.card_setting);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!item?.cards) {
      return;
    }
    setCards(item?.cards);
  }, [item]);

  useEffect(() => {
    if (userData) {
      dispatch(
        getColumnInfo({
          id: userData?.id,
          cards: userData?.cards,
        }),
      );
    }
    if (isSave && cardIndex !== null) {
      updateFirebaseData(`boards/${current_board.index}/lists/${cardIndex}`, {
        cards,
      });
      fetchBackDefaultData(`/boards/${current_board.index}/lists/${cardIndex}`, getUserData);
    }
    setIsSave(false);
  }, [userData, isSave]);

  useEffect(() => {
    if (isUpdate && cardIndex !== null) {
      fetchBackDefaultData(`/boards/${current_board.index}/lists/${cardIndex}`, getUserData);
      dispatch(isCardUpdate(false));
    }
  }, [isUpdate]);

  useEffect(() => {
    dispatch(getIsOpenClSetting({isOpen: false}));
  }, []);

  const addCard = () => {
    setIsClose(false);
  };

  const isLoggedIn = !!user.uid && user.user_status !== 'guest';
  return (
    <>
      {!item?.isArchive && (
        <div className='column ' data-id={item?.id}>
          <ColumnHeader item={item} listIndex={cardIndex as number} name={name} addNewCard={addCard} />

          <div className='column__info'>
            {cards?.map((card: any, i: any) => {
              return (
                <div className='column__card' key={i}>
                  <CardDisplay card={card} item={item} />
                </div>
              );
            })}
            {!isClose ? (
              <div className='column__box'>
                <CreateCard
                  setCards={setCards}
                  setIsSave={setIsSave}
                  setIsClose={setIsClose}
                  listId={item?.id as string}
                  setCardIndex={setCardIndex}
                />
              </div>
            ) : (
              isLoggedIn && (
                <button className='column__button' type='button' onClick={addCard}>
                  <span></span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Column;
