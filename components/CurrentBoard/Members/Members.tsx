'use client';
import {FC, useEffect, useState} from 'react';
import 'firebase/auth';
import AddMember from './AddMember/AddMember';
import './Members.scss';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import ClickAwayListener from '@/components/ClickAwayListener/ClickAwayListener';

const Members: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='new-members'>
      <div className='new-members__container'>
        <button className='new-members__button' onClick={(e) => setIsOpen(!isOpen)}></button>
        {isOpen && (
          // <ClickAwayListener setIsOpen={(e) => setIsOpen(e)}>
          <div className='new-members__popup'>
            <MiniPopup title='Add new members' setIsOpen={setIsOpen}>
              <AddMember setIsOpen={(e) => setIsOpen(e)} />
            </MiniPopup>
          </div>
          // </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Members;
