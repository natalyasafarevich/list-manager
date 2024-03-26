'use client';
import {FC, useEffect, useState} from 'react';
import CardSettings from '../CardSettings/CardSettings';
import {AppDispatch} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import {getMarkersCurrent, isArchivedCard} from '@/store/card-sidebar/actions';

export type CardDisplayProps = {
  card: ColumnCardsProps;
  item: any;
};

const CardDisplay: FC<CardDisplayProps> = ({card, item}) => {
  const [isOpenCard, setIsOpenCards] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getColumnInfo({
        id: item?.id,
        cards: item?.cards,
      }),
    );
  }, [isOpenCard]);

  const openCard = () => {
    setIsOpenCards(!isOpenCard);
    card?.isArchived && dispatch(isArchivedCard(card?.isArchived));
  };

  return (
    <>
      {!card?.isArchived && (
        <button
          onClick={(e) => {
            dispatch(getMarkersCurrent([]));
            setIsOpenCards(!isOpenCard);
          }}
          className='bg-transparent text-light w-100'
        >
          <span> {card.title}</span>
          {card?.description && (
            <div dangerouslySetInnerHTML={{__html: card.description}}></div>
          )}
          <div className='w-100 d-flex  '>
            {card?.markers?.map((item, i) => (
              <div
                key={i}
                className='m-2'
                style={{width: '50px', height: '10px', background: item}}
              ></div>
            ))}
          </div>
        </button>
      )}

      {isOpenCard && <CardSettings setIsOpenCard={openCard} card={card} />}
    </>
  );
};

export default CardDisplay;
