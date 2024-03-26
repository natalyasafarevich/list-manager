import {FC} from 'react';
import Markers from './Markers/Markers';
import CheckLists from './CheckLists/CheckLists';
import CardArchived from '../CardSettings/CardArchived/CardArchived';

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
        <li>
          <CardArchived />
        </li>
      </ul>
    </div>
  );
};
export default CardSideBar;
