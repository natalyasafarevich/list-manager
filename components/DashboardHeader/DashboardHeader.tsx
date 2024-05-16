'use client';
import {FC, useState, useRef} from 'react';
import Link from 'next/link';
import Search from '../Search/Search';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import DropDownHeader from '../DropDownHeader/DropDownHeader';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import './DashboardHeader.scss';
import useClickOutside from '@/hooks/useClickOutside';
import FavoriteComponent from '../FavoriteComponent/FavoriteComponent';
import NotificationButton from '../NotificationButton/NotificationButton';

const DashboardHeader: FC = () => {
  const [isCreated, setIsCreated] = useState(false);

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
              <FavoriteComponent />
              <div className='dashboard-header__search'></div>
            </div>
            <div className='dashboard-header__box dashboard-header__box_icons'>
              <div className='dashboard-header__board' ref={createBoardFormRefClickOutside}>
                <button
                  className='dashboard-header__button dashboard-header__button_add'
                  onClick={() => setIsCreateBoardFormClose(!isCreateBoardFormClose)}
                ></button>
                <div className='dashboard-header__form'>
                  <CreateBoardForm
                    setIsOpen={setIsCreateBoardFormClose}
                    isCreated={setIsCreated}
                    isClose={isCreateBoardFormClose}
                  />
                </div>
              </div>
              <NotificationButton />
              <ProfilePopup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
