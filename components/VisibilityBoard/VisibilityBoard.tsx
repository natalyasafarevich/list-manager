'use client';
import React, {FC, useEffect, useState} from 'react';
import './VisibilityBoard.scss';

interface VisibilityBoardProp {
  currentValue: (e: string) => void;
}
const VisibilityBoard: FC<VisibilityBoardProp> = ({currentValue}) => {
  const [activeType, setActiveType] = useState<string>('public');
  useEffect(() => {
    currentValue('public');
  }, []);
  const changeTypeBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget} = e;
    if (currentTarget.dataset.type) {
      setActiveType(currentTarget.dataset.type);
      currentValue(currentTarget.dataset.type);
    }
  };
  return (
    <div className='visibility'>
      <div className='visibility__container'>
        <p className='visibility__title'>Type of board</p>
        <div className={`visibility__box ${activeType === 'public' ? 'active' : ''}`}>
          <button className='visibility__button' data-type='public' type='button' onClick={changeTypeBoard}>
            Public
            <span className='visibility__desc'>The public board can be viewed by everyone.</span>
          </button>
        </div>
        <div className={`visibility__box ${activeType === 'private' ? 'active' : ''}`}>
          <button className='visibility__button' data-type='private' type='button' onClick={changeTypeBoard}>
            Private
            <span className='visibility__desc'>The private board can only be viewed by board members.</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisibilityBoard;
