import {FC, useEffect, useState} from 'react';
import Inner from './Inner/Inner';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';
import './Cover.scss';
const covers = ['#4bce97', '#e2b203', '#f87462', '#9f8fef'];

const Cover: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.current_info);
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <div className='card-cover'>
      <p
        className='card-sidebar-title underline'
        onClick={(e) => {
          // if (!isLoggedIn) {
          //   return;
          // }
          setIsOpen(!isOpen);
        }}
      >
        Cover
      </p>
      {isOpen && (
        <div className='mini-popup-container'>
          <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='Cover'>
            <div className='card-cover__item'>
              <Inner />
            </div>
          </MiniPopup>
        </div>
      )}
    </div>
  );
};

export default Cover;
