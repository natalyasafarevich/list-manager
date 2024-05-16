'use client';
import {FC, useEffect, useState} from 'react';
import './BoardView.scss';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const BoardView: FC = () => {
  const [currentView, setCurrentView] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const boardIndex = useSelector((state: RootState) => state.boards.index);

  // updating direction data in firebase
  useEffect(() => {
    if (currentView && isUpdate) {
      updateFirebaseData(`boards/${boardIndex}`, {direction: currentView});
      setIsUpdate(false);
    }
  }, [currentView]);

  // getting the direction data from firebase
  useEffect(() => {
    fetchBackDefaultData(`boards/${boardIndex}/direction`, setCurrentView);
  }, [boardIndex]);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {currentTarget} = e;
    if (currentTarget.dataset.direction) {
      setCurrentView(currentTarget.dataset.direction);
      setIsUpdate(true);
    }
  };
  return (
    <div className='board-view'>
      <div className='board-view__container'>
        <div
          data-direction='row'
          className={`board-view__item board-view__item-row ${currentView === 'row' ? 'active' : ''}`}
          onClick={handleItemClick}
        >
          Board View
        </div>
        <div
          data-direction='column'
          className={`board-view__item board-view__item-column ${currentView === 'column' ? 'active' : ''} `}
          onClick={handleItemClick}
        >
          List View
        </div>
      </div>
    </div>
  );
};

export default BoardView;
