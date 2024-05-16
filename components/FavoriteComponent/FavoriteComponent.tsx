import {FC, useState} from 'react';
import DropDownHeader from '../DropDownHeader/DropDownHeader';
import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';

const FavoriteComponent: FC = () => {
  const [isClose, setIsClose] = useState(false);

  return (
    <div className='dashboard-header__favorite'>
      <span className={`dashboard-header__icon flex ${isClose ? 'active' : ''}`} onClick={() => setIsClose(!isClose)}>
        Favorites boards
      </span>
      {isClose && (
        <ClickAwayListener setIsOpen={(e) => setIsClose(e)}>
          {' '}
          <DropDownHeader />
        </ClickAwayListener>
      )}
    </div>
  );
};

export default FavoriteComponent;
