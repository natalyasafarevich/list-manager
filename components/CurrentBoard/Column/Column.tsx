'use state';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {updateUserData} from '@/helper/updateUserData';
import CreateCard from './CreateCard/CreateCard';
import CardDisplay from './CardDisplay/CardDisplay';
import NameWithSettingsButton from './NameWithSettingsButton/NameWithSettingsButton';
import {getIsOpenClSetting} from '@/store/column-setting/actions';

type ColumnProps = {
  item?: {id?: string; cards: Array<any>};
  name?: string;
};

const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);
  const isCreateNewCard = useSelector(
    (state: any) => state.cl_setting.isCreate,
  );
  const dispatch: AppDispatch = useDispatch();

  const [isClose, setIsClose] = useState<boolean>(true); // Состояние открытия текущего компонента

  // useEffect(() => {
  //   if (isCreateNewCard) {
  //     addCard();
  //     return;
  //   }
  //   // setIsClose(true);
  //   console.log(isCreateNewCard);
  // }, [isCreateNewCard]);

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

  const addCard = () => {
    setIsClose(false);
    dispatch(getIsOpenClSetting({isOpen: true}));
    // При добавлении карточки открываем компонент
  };

  return (
    <div
      className='m-2 border rounded p-3 bg-light text-dark position-relative '
      data-id={item?.id}
    >
      <NameWithSettingsButton name={name} addNewCard={addCard} />
      {!isClose ? (
        <CreateCard
          setCards={setCards}
          setIsSave={setIsSave}
          setIsClose={setIsClose}
          listId={item?.id as string}
          setCardIndex={setCardIndex}
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
          <button type='button' onClick={addCard}>
            добавить карточкvу
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;
