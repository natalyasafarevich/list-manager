'use client';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import {updateUserData} from '@/helper/updateUserData';
import {CheckListProps} from '@/types/interfaces';
import {
  getCheckLists,
  getCurrentTask,
  isTaskUpdate,
} from '@/store/check-lists/actions';
import {fetchBackData} from '@/helper/getFirebaseData';

const CheckLists: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [checkLists, setCheckLists] = useState<Array<CheckListProps>>([]);
  const [checkFBLists, setCheckFBLists] = useState<any>([]);
  const user = useSelector((state: RootState) => state.userdata);
  const idList = useSelector((state: RootState) => state.check_lists);
  const dispatch: AppDispatch = useDispatch();
  const isUpdateTaskList = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  console.log(isUpdateTaskList, 'isUpdateTaskList');
  useEffect(() => {
    if (
      user ||
      checkLists.length !== checkFBLists.length ||
      idList.current_tasks.isCreate ||
      isUpdateTaskList
    ) {
      fetchBackData(
        user.uid,
        `/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setCheckFBLists,
      );
      dispatch(isTaskUpdate(false));
    }
  }, [user, idList.current_tasks.isCreate, isUpdateTaskList]);

  useEffect(() => {
    if (checkFBLists?.length > 0) {
      console.log(checkFBLists, 'gcheckFBLists');
      setCheckLists(checkFBLists);
      dispatch(getCheckLists(checkFBLists));
      // dispatch(getCurrentTask(checkLists, false));
    }
  }, [checkFBLists]);

  useEffect(() => {
    checkLists.length &&
      updateUserData(
        `${user.uid}/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        {
          'check-lists': checkLists,
        },
      );
    dispatch(getCheckLists(checkLists));
  }, [checkLists.length, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newList = {
      id: createId(),
      title: value,
    };
    if (value.length !== 0) {
      setCheckLists((prev) => [...prev, newList]);
      setIsOpen(!isOpen);
      setValue('');
    }
  };

  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}> чек лист</p>
      {isOpen && (
        <MiniPopup
          title={'Добавление списка задач'}
          setIsOpen={(e) => setIsOpen(e)}
        >
          <form onSubmit={handleSubmit}>
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
