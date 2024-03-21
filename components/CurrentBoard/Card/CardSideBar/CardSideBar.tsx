import {FC} from 'react';
import Markers from './Markers/Markers';
import CheckLists from './CheckLists/CheckLists';

const CardSideBar: FC = () => {
  return (
    <div>
      <p>Добавить на карточку:</p>
      <ul>
        <li>Участники</li>
        <li>
          <Markers />
        </li>
        <li>
          <CheckLists />
        </li>
      </ul>
    </div>
  );
};
export default CardSideBar;