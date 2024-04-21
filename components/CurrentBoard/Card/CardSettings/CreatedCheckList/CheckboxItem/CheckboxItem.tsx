import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isTaskUpdate} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListTasksProps} from '../AddItemForm/AddItemForm';

interface CheckboxItemProps {
  item: ListTasksProps;
  listId: string;
}

const CheckboxItem: FC<CheckboxItemProps> = ({item, listId}) => {
  const [value, setValue] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setValue(item.title);
    if (item.isChecked) {
      setIsChecked(true);
    }
  }, [item]);

  const user = useSelector((state: RootState) => state.userdata);
  const {dataLink} = user;

  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  useEffect(() => {
    if (isUpdate) {
      updateFirebaseData(
        `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${listId}/tasks/${item.id}`,
        {
          isChecked: isChecked,
        },
      );
      dispatch(isTaskUpdate(true));
      setIsUpdate(false);
    }
  }, [isChecked, isUpdate]);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    setIsUpdate(true);
    if (e.currentTarget.checked) {
      dispatch(isTaskUpdate(true));
    }
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
      `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${listId}/tasks/${item.id}`,
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
          <button type='button' disabled={!isLoggedIn}>
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
