'use client';
import React, {FC, useEffect} from 'react';
import './VisibilityBoard.scss';

interface VisibilityBoardProp {
  currentValue: (e: string) => void;
}
const VisibilityBoard: FC<VisibilityBoardProp> = ({currentValue}) => {
  useEffect(() => {
    currentValue('public');
  }, []);
  const changeTypeBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget} = e;
    if (currentTarget.dataset.type) currentValue(currentTarget.dataset.type);
  };
  return (
    <div className='visibility'>
      <div className='visibility__container'>
        <p className='visibility__title'>Type of board</p>
        <div className='visibility__box'>
          <button
            className='visibility__button'
            data-type='public'
            type='button'
            onClick={changeTypeBoard}
          >
            Public
          </button>
          <span className='visibility__desc'>
            The public board can be viewed by everyone.
          </span>
        </div>
        <div className='visibility__box'>
          <button
            className='visibility__button'
            data-type='private'
            type='button'
            onClick={changeTypeBoard}
          >
            Private
          </button>
          <span className='visibility__desc'>
            The private board can only be viewed by board members.
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisibilityBoard;
