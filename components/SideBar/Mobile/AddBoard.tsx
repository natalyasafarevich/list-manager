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
        <svg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_d_12_1067)'>
            <rect x='6' y='3' width='52' height='52' rx='26' fill='#1DA1FA' shape-rendering='crispEdges' />
            <path d='M26 29H38' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
            <path d='M32 35V23' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
          </g>
          <defs>
            <filter
              id='filter0_d_12_1067'
              x='0'
              y='0'
              width='64'
              height='64'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'
            >
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='3' />
              <feGaussianBlur stdDeviation='3' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix type='matrix' values='0 0 0 0 0.583 0 0 0 0 0.815145 0 0 0 0 0.971667 0 0 0 1 0' />
              <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_1067' />
              <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_1067' result='shape' />
            </filter>
          </defs>
        </svg>
      </button>
    </>
  );
};

export default AddBoard;
