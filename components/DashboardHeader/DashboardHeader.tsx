import {FC, useState, useRef} from 'react';
import Link from 'next/link';
import Search from '../Search/Search';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import DropDownHeader from '../DropDownHeader/DropDownHeader';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import './DashboardHeader.scss';
import useClickOutside from '@/hooks/useClickOutside';
import FavoriteComponent from '../FavoriteComponent/FavoriteComponent';
import Notification from '../Notification/Notification';

const DashboardHeader: FC = () => {
  const [isCreated, setIsCreated] = useState(false);
  // const createBoardFormRef = useRef<HTMLDivElement>(null);

  const {
    ref: createBoardFormRefClickOutside,
    isClose: isCreateBoardFormClose,
    setIsClose: setIsCreateBoardFormClose,
  } = useClickOutside<HTMLDivElement>(false, false);

  return (
    <div className='dashboard-header'>
      <div className='dashboard-header__container '>
        <div className='content-wrap'>
          <div className='dashboard-header__row'>
            <div className='dashboard-header__box'>
              <Link href={'/'} className='dashboard-header__logo logo'></Link>
              <Link
                href={'/boards'}
                className='dashboard-header__link dashboard-header__link_board'
              >
                Boards
              </Link>
              <Link href={'/templates'} className='dashboard-header__link'>
                Templates
              </Link>
              <FavoriteComponent />
              <div className='dashboard-header__search'></div>
            </div>
            <div className='dashboard-header__box dashboard-header__box_icons'>
              <Search />
              <div
                className='dashboard-header__board'
                ref={createBoardFormRefClickOutside}
              >
                <button
                  className='dashboard-header__button dashboard-header__button_add'
                  onClick={() =>
                    setIsCreateBoardFormClose(!isCreateBoardFormClose)
                  }
                ></button>
                <div className='dashboard-header__form'>
                  {/* {isCreateBoardFormClose && ( */}
                  <CreateBoardForm
                    setIsOpen={setIsCreateBoardFormClose}
                    isCreated={setIsCreated}
                    isClose={isCreateBoardFormClose}
                    // currentRef={createBoardFormRefClickOutside}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className='logo__'>
                <button className='dashboard-header__button dashboard-header__button_notification'></button>
                <Notification />
              </div>
              <ProfilePopup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
