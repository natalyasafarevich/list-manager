'use client';
import {FC, useState, useRef} from 'react';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import useClickOutside from '@/hooks/useClickOutside';
import FavoriteComponent from '../FavoriteComponent/FavoriteComponent';
import NotificationButton from '../NotificationButton/NotificationButton';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

import './DashboardHeader.scss';
import useResponsive from '@/hooks/useResponsive';
import {HeaderToggle} from '../HeaderToggle/HeaderToggle';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';
import {rejects} from 'assert';

const DashboardHeader: FC = () => {
  const db = getDatabase(firebaseApp);
  // const board = useSelector((state: RootState) => state.boards.currentBoards);
  const starCountRef = ref(db, 'boards/' + '103db445-d8ac-456d-9262-b68c24cbf180');
  const product = onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
  console.log(product);
  const {isMobile} = useResponsive();
  const [isCreated, setIsCreated] = useState(false);
  const {uid} = useSelector((state: RootState) => state.userdata);
  const {
    ref: createBoardFormRefClickOutside,
    isClose: isCreateBoardFormClose,
    setIsClose: setIsCreateBoardFormClose,
  } = useClickOutside<HTMLDivElement>(false, false);

  if (uid)
    return (
      <div className='dashboard-header'>
        <div className='dashboard-header__container '>
          <div className='content-wrap'>
            <div className='dashboard-header__row'>
              {!isMobile && (
                <div className='dashboard-header__box'>
                  <FavoriteComponent />
                  <div className='dashboard-header__search'></div>
                </div>
              )}
              <div className='dashboard-header__box dashboard-header__box_icons'>
                {!isMobile && (
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
                )}
                {!isMobile && <NotificationButton />}
                <ProfilePopup />
                <div className='header__toggle'>
                  <HeaderToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardHeader;
