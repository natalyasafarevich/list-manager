import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {
  getCheckLists,
  // getListIndex as getCurrentListIndex,
  isDeleteList,
  isTaskUpdate,
} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import React, {useState, ChangeEvent, FormEvent, FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as createId} from 'uuid';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import {CheckListProps} from '@/types/interfaces';
import {updateFirebaseData} from '@/helper/updateUserData';
import './AddItemForm.scss';
import {isCardUpdate} from '@/store/card-setting/actions';

export interface ListTasksProps {
  title: string;
  id: string;
  isChecked?: boolean;
  isDelete?: boolean;
}

interface Props {
  item: CheckListProps;
  isHide: (value: boolean, id: string) => void;
  currentValue: (e: any) => void;
}

const AddItemForm: FC<Props> = ({item, currentValue, isHide}) => {
  console.log(item, 'jlkllkk');
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueInput, setInputValue] = useState('');
  const [value, setValue] = useState<any>({});
  const [tasksFB, setTasksFB] = useState<Array<CheckListProps>>();

  const idList = useSelector((state: RootState) => state.check_lists);
  const user = useSelector((state: RootState) => state.userdata);

  const dispatch: AppDispatch = useDispatch();

  // assigning the current value of the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    item?.isHideCheckedList && setIsHideChecked(item?.isHideCheckedList);
  }, [item.isHideCheckedList]);

  // passing to the parent component for sending to the server
  useEffect(() => {
    if (value && isUpdate) {
      currentValue(value);
      setIsUpdate(false);
    }
  }, [value]);
  const [isHideChecked, setIsHideChecked] = useState(false);
  const [hideText, setHideText] = useState('');
  const isUpdateTaskList = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  //receiving tasks from the server and saving them
  useEffect(() => {
    if (tasksFB) {
      for (let key in tasksFB) {
        if (key === item.id) {
          if (tasksFB[key].tasks) {
            const sortedTasks = Object.values(tasksFB[key].tasks).sort(
              (a: any, b: any) => a.order - b.order,
            );

            const sortedTasksObject = sortedTasks.reduce(
              (acc: any, task: any) => {
                acc[task.id] = task;
                return acc;
              },
              {},
            );
            setValue(sortedTasksObject);
          }
        }
        if (tasksFB[key].tasks) {
          for (const taskId in tasksFB[key].tasks) {
            const item = tasksFB[key].tasks[taskId];
          }
          // setIsHideChecked(tasksFB[key].isHideCheckedList);
        } else if (!tasksFB[key].tasks) {
        }
      }
    } else {
      setValue({});
      // dispatch(getCurrentListIndex('0'));
      dispatch(getCheckLists({}));
    }
  }, [tasksFB]);

  //receiving data
  useEffect(() => {
    if (user) {
      fetchBackDefaultData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setTasksFB,
      );
    }
  }, [user, isUpdateTaskList]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueInput.length === 0) {
      alert('заполните поле');
      return;
    }

    if (valueInput) {
      const id = createId();
      const order = Object.keys(value).length + 1;

      setValue((prevValue: any) => {
        const newValue = {
          ...prevValue,
          [id]: {
            title: valueInput,
            id: id,
            order: order,
          },
        };
        return newValue;
      });
      setInputValue('');
      dispatch(isTaskUpdate(true));
      setIsOpen(false);
      setIsUpdate(true);

      // dispatch(getCurrentListIndex(item.id));
    }
  };

  const deleteList = () => {
    const updatedTasks = {...tasksFB};
    delete updatedTasks[item?.id as any];

    updateFirebaseData(
      `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
      {
        'check-lists': updatedTasks,
      },
    );
    // dispatch(getCurrentListIndex(item.id));
    dispatch(isDeleteList(true));
    dispatch(isCardUpdate(true));
  };

  const hideChecked = () => {
    setIsHideChecked(!isHideChecked);
    isHide(!isHideChecked, item.id);
  };

  useEffect(() => {
    Object.keys(value).map((item) => {
      if (
        !value[item].isChecked ||
        (value[item].isDelete && value[item].isChecked)
      ) {
        return;
      }
      isHideChecked
        ? setHideText('Show checked item')
        : setHideText('Hide checked item');
    });
  }, [value]);
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';
  return (
    <div className='checkbox-form'>
      <div className='checkbox-form__container'>
        <div className='checkbox-form__row flex'>
          <p className='checkbox-form__title  text-underline'>{item.title}</p>
          <div className='checkbox-form__btns flex'>
            {Object.keys(value).length && hideText ? (
              <button
                className='checkbox-form__button button-light-blue'
                onClick={hideChecked}
              >
                {hideText}
              </button>
            ) : (
              ''
            )}
            {/* {isLoggedIn && ( */}
            <button
              type='button'
              className='checkbox-form__button button-shade-gray'
              onClick={deleteList}
            >
              Deleted
            </button>
            {/* )} */}
          </div>
        </div>
        <div className='checkbox-form__items'>
          {Object.keys(value)?.map((checkbox: any, i: any) => {
            if (isHideChecked && value[checkbox].isChecked) {
              return;
            }
            return (
              <div className='checkbox-form__item' key={i}>
                <CheckboxItem listId={item.id} item={value[checkbox]} />
              </div>
            );
          })}
        </div>
      </div>
      {isOpen ? (
        <form onSubmit={handleSubmit} data-id={item.id}>
          <div>
            <label htmlFor='new-item' className='checkbox-form__label'>
              Title
            </label>
            <input
              id='new-item'
              type='text'
              className='default-input checkbox-form__input'
              value={valueInput}
              onChange={handleInputChange}
            />
          </div>
          <div className='checkbox-form__flex flex'>
            <button type='submit' className='checkbox-form__button button-dark'>
              Add
            </button>
            <button
              type='button'
              className='button-border checkbox-form__button'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type='button'
          className='button-shade-gray checkbox-form__button checkbox-form__button-add'
          onClick={() => setIsOpen(!isOpen)}
          disabled={!isLoggedIn}
        >
          Add a new element
        </button>
      )}
    </div>
  );
};

export default AddItemForm;
