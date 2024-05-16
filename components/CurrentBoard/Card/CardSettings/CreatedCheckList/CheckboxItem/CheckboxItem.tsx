import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {getCheckLists, isTaskUpdate} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {ListTasksProps} from '../CheckboxForm/CheckboxForm';
import './CheckboxItem.scss';
import {CheckListItemProps} from '@/types/interfaces';
import MiniPopup from '@/components/MiniPopup/MiniPopup';

interface CheckboxItemProps {
  item: any;
  listId: string;
}

const CheckboxItem: FC<CheckboxItemProps> = ({item, listId}) => {
  const [value, setValue] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [toggleText, setToggleText] = useState('');

  useEffect(() => {
    setValue(item.title);
    if (item.isChecked) {
      setIsChecked(true);
      setToggleText('Unchecked item');
    } else {
      setToggleText('Checked item');
    }
  }, [item]);

  const user = useSelector((state: RootState) => state.userdata);
  const checkLists = useSelector((state: RootState) => state.check_lists);

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
  const [isdUpdate, setIsUpddate] = useState(false);
  const [updatedTasks, setUpdatedTasks] = useState<{
    [taskId: string]: any;
  } | null>(null);
  const deleteTask = () => {
    const tasks = {...checkLists.lists[listId as any].tasks};
    delete tasks[item.id as any];

    // Обновление данных в Firebase
    updateFirebaseData(
      `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${listId}`,
      {tasks},
    )
      .then(() => {
        // После успешного обновления в Firebase обновляем локальное состояние
        setUpdatedTasks(tasks);
        dispatch(isTaskUpdate(true));
      })
      .catch((error) => {
        // Обработка ошибок, если обновление в Firebase не удалось
        console.error('Error deleting task:', error);
      });
  };

  // useEffect(() => {
  //   if (isdUpdate) {
  //     setIsOpenSetting(!isOpenSetting);
  //     updateFirebaseData(
  //       `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${listId}`,
  //       {tasks: updatedTasks},
  //     );
  //     dispatch(isTaskUpdate(true));
  //     setIsUpddate(false);
  //   }
  // }, [updatedTasks, isdUpdate]);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  return (
    <div className='check-list-item'>
      {/* {!item.isDelete && ( */}
      <form className='check-list-item__form' onSubmit={handleSubmit}>
        <input
          className='check-list-item__checkbox'
          id={item.id}
          type='checkbox'
          checked={isChecked}
          onChange={checkboxChange}
          disabled={!isLoggedIn}
        />
        <textarea
          className='check-list-item__value'
          value={value}
          onChange={changeInput as any}
          onClick={handleClick}
          readOnly={isReadOnly}
          disabled={!isLoggedIn}
        ></textarea>

        <button type='button' onClick={(_e) => setIsOpenSetting(!isOpenSetting)} className='button-more'></button>
        {isOpenSetting && (
          <div className='check-list-item__popup'>
            <MiniPopup title='Task configuration ' setIsOpen={(e) => setIsOpenSetting(e)}>
              <input
                type='button'
                onClick={checkboxChange as any}
                className='check-list-item__change button-light-blue'
                value={toggleText}
              ></input>
              <button
                type='button'
                onClick={deleteTask}
                className='check-list-item__button button-shade-gray'
                disabled={!isLoggedIn}
              >
                Delete task
              </button>
            </MiniPopup>
          </div>
        )}
        {/* <button
            type='button'
            onClick={deleteTask}
            className='button-close check-list-item__button'
            disabled={!isLoggedIn}
          ></button>
          {!isReadOnly && (
            <div className='check-list-item__row flex'>
              <button className='button-dark' type='submit'>
                Save
              </button>
              <button
                className='button-border'
                type='button'
                onClick={closeEditItem}
              >
                Cancel
              </button>
            </div>
          )} */}
        {!isReadOnly && (
          <div className='check-list-item__row flex'>
            <button className='button-dark' type='submit'>
              Save
            </button>
            <button className='button-border' type='button' onClick={closeEditItem}>
              Cancel
            </button>
          </div>
        )}
      </form>
      {/* )} */}
    </div>
  );
};

export default CheckboxItem;
