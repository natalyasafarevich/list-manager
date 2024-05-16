import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {redirect} from 'next/navigation';
import {FC, FormEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import './CopyBoard.scss';

const CopyBoard: FC = () => {
  const [newBoard, setNewBoard] = useState<any>();
  const [isUpdate, setIsIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const currentBoard = useSelector((state: RootState) => state.boards.currentBoards);
  const boards = useSelector((state: RootState) => state.boards.boards);

  useEffect(() => {
    if (title.length !== 0) {
      setIsDisabled(false);
      return;
    }

    setIsDisabled(true);
  }, [title]);
  useEffect(() => {
    if (newBoard && isUpdate) {
      updateFirebaseData(`boards/${newBoard.id}`, newBoard);
      updateUserData(`${user.uid}/current-boards`, {[newBoard.id]: true});

      redirect(`/board/${newBoard.id}`);
    }
  }, [newBoard, isUpdate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked && title && currentBoard.lists) {
      const newLists = currentBoard.lists.map((list: any) => {
        const {cards, ...listWithoutCards} = list;
        return {...listWithoutCards};
      });
      const {id, name, members, ...every} = currentBoard;
      const newBoard = {
        id: uuidv4(),
        name: title,
        members: {
          [user.uid]: true,
        },
        ...every,
        lists: newLists,
      };

      setNewBoard(newBoard);
      setIsIsUpdate(true);
    } else {
      const newId = uuidv4();

      const {id, members, name, ...every} = currentBoard;

      const newBoard = {
        id: newId,
        name: title,
        members: {
          [user.uid]: true,
        },
        ...every,
      };

      setNewBoard(newBoard);
      setIsIsUpdate(true);
    }
  };
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <div className='copy-board'>
      <p onClick={() => setIsOpen(!isOpen)} className='expandable-content__title underline'>
        Copy the board
      </p>
      {isLoggedIn && isOpen && (
        <form action='' onSubmit={handleSubmit} className='copy-board__form'>
          <button className='button-close' onClick={() => setIsOpen(!isOpen)}></button>
          <label htmlFor='title' className='copy-board__label'>
            Title
          </label>
          <input
            className='copy-board__input'
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <div className='copy-board__box'>
            <input
              className='copy-board__checkbox'
              type='checkbox'
              id='i'
              onChange={(e) => setIsChecked(e.currentTarget.checked)}
            />
            <label htmlFor='i'>Leave the cards</label>
          </div>
          <button type='submit' className='copy-board__button button-dark' disabled={isDisabled}>
            Copy the board
          </button>
        </form>
      )}
    </div>
  );
};

export default CopyBoard;
