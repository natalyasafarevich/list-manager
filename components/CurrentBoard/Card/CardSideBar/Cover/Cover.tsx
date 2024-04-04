import {getDatabase, ref, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import Inner from './Inner/Inner';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';
const covers = ['#4bce97', '#e2b203', '#f87462', '#9f8fef'];
const Cover: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div className='position-relative'>
      <p
        onClick={(e) => {
          if (user_status === 'guest') {
            return;
          }
          setIsOpen(!isOpen);
        }}
      >
        обложка
      </p>
      {isOpen && (
        <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='обложка'>
          <Inner />
        </MiniPopup>
      )}
    </div>
  );
};

export default Cover;
