'use client';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {FC, useState} from 'react';

const CheckLists: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}> чек лист</p>
      {isOpen && (
        <MiniPopup
          title={'Добавление списка задач'}
          setIsOpen={(e) => setIsOpen(e)}
        >
          <form>
            <label htmlFor='name'>название</label>
            <input
              className='w-100'
              id='name'
              type='text'
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button type='submit'>добавить</button>
          </form>
        </MiniPopup>
      )}
    </div>
  );
};

export default CheckLists;
