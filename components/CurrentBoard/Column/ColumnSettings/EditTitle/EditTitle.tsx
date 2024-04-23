'use client';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getListIndex} from '../ArchiveColumn/ArchiveColumn';
import {updateFirebaseData} from '@/helper/updateUserData';
import {useDispatch} from 'react-redux';
import {isCardUpdate} from '@/store/card-setting/actions';
import './EditTitle.scss';

interface EditTitleProps {
  setIsOpen: (value: boolean) => void;
}

const EditTitle: FC<EditTitleProps> = ({setIsOpen}) => {
  const [name, setName] = useState('');
  const currentColumn = useSelector(
    (state: RootState) => state.column.current_column,
  );
  const board = useSelector((state: RootState) => state.boards);

  const columnId = useSelector(
    (state: RootState) => state.column.current_column.id,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setName(currentColumn.name);
  }, [currentColumn]);

  const updateColumnTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let index = getListIndex(board.currentBoards.lists, columnId);

    updateFirebaseData(`boards/${board.index}/lists/${index}`, {
      name: name,
    });
    setIsOpen(false);
    dispatch(isCardUpdate(true));
  };

  return (
    <div className='edit-title'>
      <form className='edit-title__form' onSubmit={updateColumnTitle}>
        <label htmlFor='column-title' className='edit-title__label'>
          Title
        </label>
        <input
          id='column-title'
          className='edit-title__input default-input'
          type='text'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <div className='edit-title__row flex'>
          <button type='submit' className='button-dark'>
            Save
          </button>
          <button
            type='button'
            className='button-border'
            onClick={(_e) => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTitle;
