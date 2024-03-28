import {getDatabase, ref, set} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import Inner from './Inner/Inner';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
const covers = ['#4bce97', '#e2b203', '#f87462', '#9f8fef'];
const Cover: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const send = () => {
  //   const db = getDatabase();
  //   set(ref(db, 'card-cover'), covers);
  // };
  return (
    <div className='position-relative'>
      <p onClick={(e) => setIsOpen(!isOpen)}> обложка </p>
      {isOpen && (
        <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='обложка'>
          <Inner />
        </MiniPopup>
      )}
    </div>
  );
};

export default Cover;
