import {FC} from 'react';
import Markers from './Markers/Markers';

const CardSideBar: FC = () => {
  return (
    <div>
      <p>Добавить на карточку:</p>
      <ul>
        <li>Участники</li>
        <li>
          <Markers />
        </li>
      </ul>
    </div>
  );
};
export default CardSideBar;
