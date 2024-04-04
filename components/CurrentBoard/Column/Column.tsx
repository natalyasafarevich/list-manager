'use state';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import CreateCard from '../Card/CreateCard/CreateCard';
import CardDisplay from '../Card/CardDisplay/CardDisplay';
import NameWithSettingsButton from './NameWithSettingsButton/NameWithSettingsButton';

import {fetchBackDefaultData, getFirebaseData} from '@/helper/getFirebaseData';
import {CurrentColumnProps} from '@/types/interfaces';
import {getDataUserForFB} from '@/store/data-user/actions';
import {getIsOpenClSetting} from '@/store/column-setting/actions';

type ColumnProps = {
  item?: {id: string; cards: Array<any>; isArchive: boolean};
  name?: string;
};

const Column: FC<ColumnProps> = ({item, name}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);
  const dispatch: AppDispatch = useDispatch();

  const [isClose, setIsClose] = useState<boolean>(true);

  useEffect(() => {
    if (!item?.cards) {
      return;
    }
    setCards(item?.cards);
  }, [item]);
  // const isArchived = useSelector(
  //   (state: RootState) => state.markers.isCardArchived,
  // );

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const columnData = await getFirebaseData(
  //   //       user.uid,
  //   //       `/boards/${current_board.index}/lists/${cardIndex}`,
  //   //     );
  //   //     getUserData(columnData as CurrentColumnProps);
  //   //   } catch (error) {
  //   //     alert(error + 'error in new column');
  //   //   }
  //   // };
  //   // fetchData();
  // }, []);
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
  // const markers=useSelector((state:RootState))
  useEffect(() => {
    dispatch(getIsOpenClSetting({isOpen: false}));
  }, []);

  const addCard = () => {
    setIsClose(false);
    // При добавлении карточки открываем компонент
  };
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <>
      {!item?.isArchive && (
        <div
          className='m-2 border rounded p-3 bg-light text-dark position-relative '
          data-id={item?.id}
        >
          <NameWithSettingsButton
            item={item}
            listIndex={cardIndex}
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
                  return <CardDisplay card={card} item={item} key={i} />;
                })}
              </div>
              {user_status !== 'guest' && (
                <button type='button' onClick={addCard}>
                  добавить карточкvу
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Column;
