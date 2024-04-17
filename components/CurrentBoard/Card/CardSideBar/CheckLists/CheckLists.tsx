'use client';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {CheckListProps} from '@/types/interfaces';
import {
  deleteList,
  getCheckLists,
  isDeleteList,
  isTaskUpdate,
} from '@/store/check-lists/actions';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {isCardUpdate} from '@/store/card-setting/actions';

const CheckLists: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [value, setValue] = useState('check list');
  const [checkLists, setCheckLists] = useState<Array<CheckListProps>>([]);
  const [checkFBLists, setCheckFBLists] = useState<any>([]);

  const user = useSelector((state: RootState) => state.userdata);
  const isUpdateTaskList = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  const idList = useSelector((state: RootState) => state.check_lists);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (
      isUpdateTaskList === true ||
      idList.isDeleteList ||
      checkLists.length !== checkFBLists?.length ||
      idList.current_tasks.isCreate ||
      user.uid
    ) {
      dispatch(isDeleteList(false));

      fetchBackDefaultData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setCheckFBLists,
      );
    }
  }, [
    user,
    idList.current_tasks.isCreate,
    isUpdateTaskList,
    idList.isDeleteList,
  ]);

  useEffect(() => {
    if (checkFBLists?.length > 0) {
      dispatch(isTaskUpdate(false));
      setCheckLists(checkFBLists);
      dispatch(getCheckLists(checkFBLists));
      dispatch(deleteList(checkFBLists));
    }
  }, [checkFBLists]);

  useEffect(() => {
    checkLists.length &&
      updateFirebaseData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        {
          'check-lists': checkLists,
        },
      );
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    if (checkLists.length > 0) {
      dispatch(getCheckLists(checkLists));
    }
  }, [checkLists]);
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
      setIsUpdate(true);
      dispatch(isCardUpdate(true));
    }
  };
  const user_status = useSelector((state: RootState) => state.userdata);
  const isLoggedIn = !!user_status.uid && user_status.user_status !== 'guest';

  return (
    <div className='position-relative'>
      <p
        onClick={() => {
          if (!isLoggedIn) {
            return;
          }
          setIsOpen(!isOpen);
        }}
      >
        чек лист
      </p>
      {isOpen && (
        <MiniPopup
          title={'Добавление списка задач'}
          setIsOpen={(e) => setIsOpen(e)}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>название</label>
            <input
              // placeholder='check list'
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
