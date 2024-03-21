'use client';
import {FC, useEffect, useState} from 'react';
import CardSettings from '../CardSettings/CardSettings';
import {AppDispatch} from '@/store/store';
import {useDispatch} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import {getMarkersCurrent} from '@/store/card-sidebar/actions';

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
  };
  return (
    <>
      <button
        onClick={(e) => {
          dispatch(getMarkersCurrent([]));

          setIsOpenCards(!isOpenCard);
        }}
        className='bg-transparent text-light w-100'
      >
        <span> {card.title}</span>
      </button>
      {isOpenCard && <CardSettings setIsOpenCard={openCard} card={card} />}
    </>
  );
};

export default CardDisplay;
