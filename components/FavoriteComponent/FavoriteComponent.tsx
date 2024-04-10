import {FC, useState} from 'react';
import DropDownHeader from '../DropDownHeader/DropDownHeader';

const FavoriteComponent: FC = () => {
  const [isClose, setIsClose] = useState(false);

  return (
    <div className='dashboard-header__favorite'>
      <span
        className={`dashboard-header__icon flex ${isClose ? 'active' : ''}`}
        onClick={() => setIsClose(!isClose)}
      >
        Favorites
      </span>
      {isClose && <DropDownHeader />}
    </div>
  );
};

export default FavoriteComponent;
