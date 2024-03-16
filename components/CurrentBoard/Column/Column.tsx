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
import {getFirebaseData} from '@/helper/getFirebaseData';
import {CurrentColumnProps} from '@/types/interfaces';

type ColumnProps = {
  item?: {id: string; cards: Array<any>};
  name?: string;
};

const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);
  const isCreateNewCard = useSelector((state: RootState) => state.column);
  const dispatch: AppDispatch = useDispatch();

  const [isClose, setIsClose] = useState<boolean>(true); // Состояние открытия текущего компонента
  // useEffect(()=>
  // )
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
    // console.log(isCreateNewCard, 'c');
  }, [isCreateNewCard]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userData = await getFirebaseData(
  //         user.uid,
  //         `/boards/${current_board.index}/lists/${cardIndex}`,
  //       );
  //       // console.log(userData, 'userData');
  //       // console.log(userData, 'uer data');
  //     } catch (error) {
  //       alert(error + 'error in new column');
  //     }
  //   };
  //   fetchData();
  //   // getFirebaseData(
  //   //   user.uid +,
  //   // );
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnData = await getFirebaseData(
          user.uid,
          `/boards/${current_board.index}/lists/${cardIndex}`,
        );

        // console.log(columnData,'hjk');
        getUserData(columnData as CurrentColumnProps);
        // console.log(userData, 'uer data');
      } catch (error) {
        alert(error + 'error in new column');
      }
    };
    fetchData();
  }, []);
  const [userData, getUserData] = useState<CurrentColumnProps>();
  console.log(userData, 'ghjk');
  useEffect(() => {
    if (userData)
      dispatch(
        getColumnInfo({
          id: userData.id,
          cards: userData.cards,
        }),
      );
  }, [userData]);
  useEffect(() => {
    if (isSave) {
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${cardIndex}`,
        {cards},
      );
      const fetchData = async () => {
        try {
          const columnData = await getFirebaseData(
            user.uid,
            `/boards/${current_board.index}/lists/${cardIndex}`,
          );
          getUserData(columnData as CurrentColumnProps);
          // console.log(userData, 'uer data');
        } catch (error) {
          alert(error + 'error in new column');
        }
      };
      fetchData();
    }
    setIsSave(false);
  }, [isSave]);
  useEffect(() => {
    dispatch(getIsOpenClSetting({isOpen: false}));
  }, []);
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
      <NameWithSettingsButton
        // setIsUpdate={(e) => setIsUpdate(e)}
        item={item}
        name={name}
        addNewCard={addCard}
      />
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
