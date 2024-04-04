import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {redirect} from 'next/navigation';
import {FC, FormEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
const CopyBoard: FC = () => {
  const [newBoard, setNewBoard] = useState<any>();
  const [isUpdate, setIsIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
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

      redirect(`/board/${newBoard.id.slice(0, 5)}`);
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
  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}>копировать доску</p>
      {isOpen && (
        <form
          action=''
          onSubmit={handleSubmit}
          className='position-absolute bg-black top-0 p-2'
        >
          <label htmlFor='title'>название</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <div className='d-flex mt-2'>
            <input
              type='checkbox'
              id='i'
              onChange={(e) => setIsChecked(e.currentTarget.checked)}
            />
            <label htmlFor='i'>оставить карточки</label>
          </div>
          <button type='submit' disabled={isDisabled}>
            создать
          </button>
        </form>
      )}
    </div>
  );
};

export default CopyBoard;
