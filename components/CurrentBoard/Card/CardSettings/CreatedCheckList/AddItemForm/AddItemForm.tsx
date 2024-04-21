// import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {
  getListIndex as getCurrentListIndex,
  deleteList as deleteListStore,
  isDeleteList,
  isTaskUpdate,
} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  FC,
  useEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as createId} from 'uuid';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import {CheckListProps} from '@/types/interfaces';
import {updateFirebaseData} from '@/helper/updateUserData';
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
        }
      }
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

      dispatch(getCurrentListIndex(item.id));
    }
  };
  // delete task
  const deleteList = () => {
    const updatedTasks = {...tasksFB};
    delete updatedTasks[idList.index];

    updateFirebaseData(
      `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
      {
        'check-lists': updatedTasks,
      },
    );
    dispatch(getCurrentListIndex(item.id));
    dispatch(isDeleteList(true));
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
        ? setHideText('показать отмеченные')
        : setHideText('cкрыть');
    });
  }, [value]);
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <>
      <div className=''>
        <div className='d-flex align-items-center justify-content-between'>
          <span>{item.title}</span>
          {Object.keys(value).length && hideText ? (
            <button onClick={hideChecked}>{hideText}</button>
          ) : (
            ''
          )}
          {isLoggedIn && <button onClick={deleteList}>удалить</button>}
        </div>
        <ul className=''>
          {Object.keys(value)?.map((checkbox: any, i: any) => {
            if (isHideChecked && value[checkbox].isChecked) {
              return;
            }
            if (value[checkbox].isDelete) {
              return null;
            }
            return (
              <CheckboxItem key={i} listId={item.id} item={value[checkbox]} />
            );
          })}
        </ul>

        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          disabled={!isLoggedIn}
        >
          добавить элемент
        </button>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} data-id={item.id}>
          <div className=''>
            <input
              type='text'
              value={valueInput}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit'>добавить</button>
          <button type='button' onClick={() => setIsOpen(false)}>
            отмена
          </button>
        </form>
      )}
    </>
  );
};

export default AddItemForm;
