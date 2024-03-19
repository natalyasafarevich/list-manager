'use client';
import {FC, useEffect, useState} from 'react';
import CardSettings from '../CardSettings/CardSettings';
import {AppDispatch} from '@/store/store';
import {useDispatch} from 'react-redux';
import {getIsOpenCardSetting} from '@/store/card-setting/actions';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {ColumnCardsProps} from '@/types/interfaces';

// export interface CardProps {
//   title: string;
//   id: string;
//   description: string;
// }
export type CardDisplayProps = {
  card: ColumnCardsProps;
  item: any;
};

// getIsOpenCardSetting
const CardDisplay: FC<CardDisplayProps> = ({card, item}) => {
  const [isOpenCard, setIsOpenCard] = useState(false);

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
    setIsOpenCard(!isOpenCard);
  };
  return (
    <>
      <button
        onClick={(e) => setIsOpenCard(!isOpenCard)}
        className='bg-transparent text-light w-100'
      >
        <span> {card.title}</span>
      </button>
      {isOpenCard && <CardSettings setIsOpenCard={openCard} card={card} />}
    </>
  );
};

export default CardDisplay;
