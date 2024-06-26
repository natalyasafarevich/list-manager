import {FC} from 'react';
import Markers from './Markers/Markers';
import CheckLists from './CheckLists/CheckLists';
import CardArchivedButton from '../CardSettings/CardArchivedButton/CardArchivedButton';
import './CardSideBar.scss';

const CardSideBar: FC = () => {
  return (
    <div className='card-sidebar'>
      <div className='card-sidebar__container'>
        {/* <div className='card-sidebar__button'>Supplemental actions</div> */}

        <p className='card-sidebar__title'>Supplemental actions:</p>
        <div className='card-sidebar__item'>
          <Markers />
        </div>
        <div className='card-sidebar__item'>
          <CheckLists />
        </div>
        <div className='card-sidebar__item'>{/* <Cover /> */}</div>
        <div className='card-sidebar__item archived'>
          <CardArchivedButton />
        </div>
      </div>
    </div>
  );
};
export default CardSideBar;
