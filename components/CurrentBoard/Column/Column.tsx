'use state';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import CreateCard from '../Card/CreateCard/CreateCard';
import CardDisplay from '../Card/CardDisplay/CardDisplay';
import ColumnHeader from './ColumnHeader/ColumnHeader';

import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {CurrentColumnProps} from '@/types/interfaces';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {isCardUpdate} from '@/store/card-setting/actions';
import './Column.scss';

type ColumnProps = {
  item?: {id: string; cards: Array<any>; isArchive: boolean};
  name?: string;
};

const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.current_info);
  const current_board = useSelector((state: RootState) => state?.boards);
  const dispatch: AppDispatch = useDispatch();

  const [isClose, setIsClose] = useState<boolean>(true);

  useEffect(() => {
    if (!item?.cards) {
      return;
    }
    setCards(item?.cards);
  }, [item]);
  const [userData, getUserData] = useState<CurrentColumnProps>();

  useEffect(() => {
    if (userData) {
      dispatch(
        getColumnInfo({
          id: userData?.id,
          cards: userData?.cards,
        }),
      );
    }
  }, [userData, isSave]);
  const cardUpdate = useSelector(
    (state: RootState) => state.card_setting.isUpdate,
  );
  useEffect(() => {
    if (cardUpdate) {
      fetchBackDefaultData(
        `/boards/${current_board.index}/lists/${cardIndex}`,
        getUserData,
      );
      dispatch(isCardUpdate(false));
    }
  }, [cardUpdate]);

  useEffect(() => {
    if (isSave) {
      updateFirebaseData(`boards/${current_board.index}/lists/${cardIndex}`, {
        cards,
      });
      fetchBackDefaultData(
        `/boards/${current_board.index}/lists/${cardIndex}`,
        getUserData,
      );
    }
    setIsSave(false);
  }, [isSave]);

  useEffect(() => {
    dispatch(getIsOpenClSetting({isOpen: false}));
  }, []);

  const addCard = () => {
    setIsClose(false);
  };
  // console.log(isClose);
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';
  return (
    <>
      {!item?.isArchive && (
        <div className='column ' data-id={item?.id}>
          <ColumnHeader
            item={item}
            listIndex={cardIndex}
            name={name}
            addNewCard={addCard}
          />

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
                <button
                  className='column__button'
                  type='button'
                  onClick={addCard}
                >
                  <span></span>
                </button>
              )
            )}
          </div>
          {/* )} */}
        </div>
      )}
    </>
  );
};

export default Column;
