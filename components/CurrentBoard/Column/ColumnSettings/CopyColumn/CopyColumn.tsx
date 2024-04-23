'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isCopyColumn} from '@/store/column-setting/actions';

import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {getListIndex} from '../ArchiveColumn/ArchiveColumn';
import {isCardUpdate} from '@/store/card-setting/actions';
interface CopyColumnProps {
  setValue: (a: string) => void;
  value: string;
  setIsOpen: (value: boolean) => void;
  setCloseMenu: (value: boolean) => void;
}
const CopyColumn: FC<CopyColumnProps> = ({setValue, value, setIsOpen,setCloseMenu}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state.boards);
  const current_column = useSelector((state: RootState) => state.column.data);

  const [currentCard, setCurrentCard] = useState();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const cardIndex = getListIndex(
      current_board?.currentBoards?.lists,
      current_column.id,
    );

    fetchBackDefaultData(
      `boards/${current_board?.index}/lists/${cardIndex}/cards`,
      setCurrentCard,
    );
  }, [user, current_column, current_board]);
  useEffect;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isCardUpdate(true));
    updateFirebaseData(
      `boards/${current_board?.index}/lists/${current_board?.currentBoards?.lists?.length}/`,
      {cards: currentCard, id: uuidv4(), name: value},
    );
    setCloseMenu(false);
  };
  return (
    <div className='copy-column'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name' className='copy-column__label'>
          Title
        </label>
        <input
          className='default-input copy-column__input'
          id='name'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <div className=' copy-column__row flex'>
          <button type='submit' className='button-dark'>
            save
          </button>
          <button
            type='button'
            className='button-border'
            onClick={(e) => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CopyColumn;
