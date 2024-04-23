'use client';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isArchivedCard} from '@/store/card-sidebar/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const CardArchived: FC = () => {
  const [archivedCards, setArchivedCards] = useState<Array<any>>([]);
  const [index, setIndex] = useState<any>({
    card: null,
    list: null,
  });

  const dispatch: AppDispatch = useDispatch();

  const state = useSelector((state: RootState) => state);
  const cards = useSelector((state: RootState) => state?.boards?.currentBoards);
  const boardIndex = useSelector((state: RootState) => state?.boards?.index);

  useEffect(() => {
    if (cards?.lists?.length !== 0) {
      const archivedCardsArray = cards?.lists
        ?.map(
          (list: any, index: number) =>
            list?.cards &&
            list?.cards
              .filter((card: any) => card.isArchived)
              .map((archivedCard: any, i: number) => ({
                ...archivedCard,
                cardId: archivedCard.id,
                listId: list.id,
                listIndex: index,
              })),
        )
        .flat();
      setArchivedCards(archivedCardsArray || []);
    }
  }, [cards?.lists]);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (index.card !== null && index.list !== null) {
      updateFirebaseData(
        `boards/${boardIndex}/lists/${index.list}/cards/${index.card}`,
        {
          isArchived: false,
        },
      );
    }
  }, [index.card, index.list]);
  const deleteFromArchive = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;

    const listId = currentTarget.dataset.id;
    const cardId = currentTarget.dataset.cardid;
    const listIndex = currentTarget.dataset.index;

    setIndex((prev: any) => ({...prev, list: listIndex}));

    cards?.lists &&
      cards?.lists.map((item: any) => {
        if (item.id === listId) {
          item.cards.filter((card: any, i: number) => {
            if (card.id === cardId) {
              setIndex((prev: any) => ({
                ...prev,
                card: item.cards.indexOf(card),
              }));
            }
          });
        }
      });

    dispatch(isArchivedCard(true));
  };

  return (
    <div className='archived'>
      <p className='additional-menu__subtitle'>Archived cards:</p>
      <div className='archived__content'>
        {archivedCards &&
          archivedCards?.map((item, i) => (
            <div key={i} className='archived__box'>
              <p className='archived__title'>{item?.title}</p>
              <button
                className='archived__button button-dark'
                data-cardid={item?.cardId}
                onClick={deleteFromArchive}
                data-id={item?.listId}
                data-index={item?.listIndex}
              >
                Return to column
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CardArchived;
