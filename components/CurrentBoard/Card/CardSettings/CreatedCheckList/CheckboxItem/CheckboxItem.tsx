import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isTaskUpdate} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import {CheckListProps} from '@/types/interfaces';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListTasksProps} from '../AddItemForm/AddItemForm';
// import {v4 as createId} from 'uuid';
interface CheckboxItemProps {
  item: ListTasksProps;
  listId: string;
}

const updateIndex = (
  lists: any,
  listId: string,
  itemId: string,
  setIndex: (a: any) => void,
) => {
  const listIndex = getListIndex(lists, listId);
  if (lists[listIndex]?.tasks) {
    const checkboxIndex = lists[listIndex]?.tasks.findIndex(
      (checkbox: any) => checkbox.id === itemId,
    );
    if (checkboxIndex !== -1) {
      setIndex((prev: any) => ({
        ...prev,
        list: listIndex,
        checkbox: checkboxIndex,
      }));
    }
  }
};

const CheckboxItem: FC<CheckboxItemProps> = ({item, listId}) => {
  const [value, setValue] = useState(item.title);
  const [initialValue, setInitialValue] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (item.isChecked) {
      setIsChecked(true);
    }
  }, [item]);

  const [index, setIndex] = useState<any>({
    list: null,
    checkbox: null,
  });

  const user = useSelector((state: RootState) => state.userdata);
  const {uid, dataLink} = user;

  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  useEffect(() => {
    if (index.list !== null && index.checkbox !== null) {
      updateFirebaseData(
        `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${index.list}/tasks/${index.checkbox}`,
        {
          isChecked: isChecked,
        },
      );
      dispatch(isTaskUpdate(true));
    }
  }, [index]);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    if (e.currentTarget.checked) {
      dispatch(isTaskUpdate(true));
    }
    updateIndex(lists, listId, item.id, setIndex);
  };

  const changeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const closeEditItem = () => {
    setValue(initialValue);
    setIsReadOnly(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length === 0) {
      alert('введите текст');
      return;
    }
    updateFirebaseData(
      `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${index.list}/tasks/${index.checkbox}`,
      {
        title: value,
      },
    );
    dispatch(isTaskUpdate(true));
    setIsReadOnly(true);
  };
  const handleClick = () => {
    setIsReadOnly(!isReadOnly);
    setInitialValue(value);

    updateIndex(lists, listId, item.id, setIndex);
  };
  useEffect(() => {
    if (isDeleteItem) {
      updateFirebaseData(
        `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${index.list}/tasks/${index.checkbox}`,
        {
          isDelete: true,
        },
      );
      setIsDeleteItem(false);
    }
  }, [isDeleteItem]);
  const deleteCheckbox = () => {
    updateIndex(lists, listId, item.id, setIndex);
    setIsDeleteItem(true);
  };
  return (
    <div>
      {!item.isDelete && (
        <form action='' onSubmit={handleSubmit}>
          <input
            id={item.id}
            type='checkbox'
            checked={isChecked}
            onChange={checkboxChange}
            disabled={!isLoggedIn}
          />

          <input
            className='m-1'
            value={value}
            onChange={changeInput}
            onClick={handleClick}
            readOnly={isReadOnly}
            disabled={!isLoggedIn}
          />
          <button type='button' onClick={deleteCheckbox} disabled={!isLoggedIn}>
            x
          </button>
          {!isReadOnly && (
            <div className='d-flex'>
              <button type='submit'>сохранить</button>
              <button type='button' onClick={closeEditItem}>
                close
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default CheckboxItem;
