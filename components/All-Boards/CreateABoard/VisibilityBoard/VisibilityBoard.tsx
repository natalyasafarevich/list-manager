'use client';
import {FC, useEffect, useState} from 'react';
interface VisibilityBoardProp {
  currentValue: (e: string) => void;
}
const VisibilityBoard: FC<VisibilityBoardProp> = ({currentValue}) => {
  const [value, setValue] = useState('рабочее пространство');
  useEffect(() => {
    currentValue('рабочее пространство');
  }, []);
  return (
    <div>
      <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          рабочее пространство
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
