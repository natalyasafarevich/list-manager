'use client';
import {FC, useState} from 'react';

const ChangeTheme: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className='d-flex'>
      <button className='btn btn-secondary' onClick={(e) => setIsOpen(!isOpen)}>
        кнопка выбора темы
      </button>
      {isOpen && (
        <form className='m-1'>
          <div className=''>
            <label htmlFor='light'>Светлая</label>
            <input
              type='radio'
              id='light'
              name='theme'
              defaultChecked={isChecked}
              onChange={() => setIsChecked((state) => !state)}
            />
          </div>
          <div className=''>
            <label htmlFor='dark'>Темная</label>
            <input type='radio' id='dark' name='theme' />
          </div>
        </form>
      )}
    </div>
  );
};
export default ChangeTheme;
