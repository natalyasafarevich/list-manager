'use client';
import {FC, useState} from 'react';
import './AddBoard.scss';
import CreateBoardForm from '@/components/CreateBoardForm/CreateBoardForm';

const AddBoard: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`add-board ${isOpen ? 'open' : ''}`}>
        <CreateBoardForm setIsOpen={setIsOpen} isClose={isOpen} />
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className='button-add-board'>
        <svg width='53' height='53' viewBox='0 0 53 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='26.5' cy='26.5' r='26.5' fill='#0560FD' />
          <path d='M26 17V36' stroke='white' stroke-width='2' stroke-linecap='round' />
          <path d='M36 27H17' stroke='white' stroke-width='2' stroke-linecap='round' />
        </svg>
      </button>
    </>
  );
};

export default AddBoard;
