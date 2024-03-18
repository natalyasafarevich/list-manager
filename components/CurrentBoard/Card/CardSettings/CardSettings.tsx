import {FC} from 'react';
import './CardSettings.css';
import {CardDisplayProps} from '../CardDisplay/CardDisplay';
import {CardProps} from 'react-bootstrap';
// CardDisplayProps
type CardSettingsProps = {
  card: CardProps;
};
const CardSettings: FC<CardSettingsProps> = ({card}) => {
  return (
    <div className='card-settings'>
      <div className='card-settings__container'>
        <span>{card.title}</span>
      </div>
    </div>
  );
};

export default CardSettings;
