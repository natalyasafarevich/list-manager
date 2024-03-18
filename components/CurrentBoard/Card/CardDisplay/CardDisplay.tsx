'use client';
import {FC, useState} from 'react';
import CardSettings from '../CardSettings/CardSettings';

export interface CardProps {
  title: string;
}
export type CardDisplayProps = {
  card: CardProps;
};
const CardDisplay: FC<CardDisplayProps> = ({card}) => {
  // console.log(card);
  const [isOpenCard, setIsOpenCard] = useState(false);
  return (
    <>
      <button
        onClick={(e) => setIsOpenCard(!isOpenCard)}
        className='bg-transparent text-light w-100'
      >
        <span> {card.title}</span>
      </button>
      {!isOpenCard && <CardSettings card={card} />}
    </>
  );
};

export default CardDisplay;
