import {FC} from 'react';

type CardDisplayProps = {
  card: {
    title: string;
  };
};
const CardDisplay: FC<CardDisplayProps> = ({card}) => {
  return <div>{card.title}</div>;
};

export default CardDisplay;
