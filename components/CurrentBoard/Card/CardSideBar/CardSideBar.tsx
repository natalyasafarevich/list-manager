import {FC} from 'react';
import Markers from './Markers/Markers';
import CheckLists from './CheckLists/CheckLists';
import CardArchivedButton from '../CardSettings/CardArchivedButton/CardArchivedButton';
import Cover from './Cover/Cover';

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
          <CardArchivedButton />
        </li>
        <li>
          <Cover />
        </li>
      </ul>
    </div>
  );
};
export default CardSideBar;
