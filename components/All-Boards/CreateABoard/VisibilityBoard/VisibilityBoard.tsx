'use client';
import React, {FC, useEffect, useState} from 'react';
interface VisibilityBoardProp {
  currentValue: (e: string) => void;
}
const VisibilityBoard: FC<VisibilityBoardProp> = ({currentValue}) => {
  // const [value, setValue] = useState('рабочее пространство');
  useEffect(() => {
    currentValue('public');
  }, []);
  const changeTypeBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget} = e;
    if (currentTarget.dataset.type) currentValue(currentTarget.dataset.type);
  };
  return (
    <div>
      <div className='dropdown'>
        <button data-type='public' type='button' onClick={changeTypeBoard}>
          публичная
        </button>
        <button data-type='private' type='button' onClick={changeTypeBoard}>
          приватная
        </button>
        {/* <div className='' aria-labelledby='dropdownMenuButton'>
          <a className='dropdown-item' href='/'>
            рабочее пространство
          </a>
          <a className='dropdown-item' href='/'>
            приватная
          </a>
          <a className='dropdown-item' href='/'>
            публичная
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default VisibilityBoard;
