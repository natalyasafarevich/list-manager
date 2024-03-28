import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {fetchBackData} from '@/helper/getFirebaseData';
import {
  getCheckLists,
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
export interface ListTasksProps {
  title: string;
  id: string;
  isChecked?: boolean;
  isDelete?: boolean;
}

interface Props {
  item: CheckListProps;
  addNewCheckbox: (e: any) => void;
  currentValue: (e: any) => void;
}

const AddItemForm: FC<Props> = ({item, addNewCheckbox, currentValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState<Array<ListTasksProps>>([]);
  const [tasksFB, setTasksFB] = useState<Array<CheckListProps>>();

  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const user = useSelector((state: RootState) => state.userdata);

  const inputValue = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();

  // assigning the current value of the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputValue.current) {
      inputValue.current.value = e.target.value;
    }
  };

  // passing to the parent component for sending to the server
  useEffect(() => {
    if (value && isUpdate) {
      currentValue(value);
      setIsUpdate(false);
    }
  }, [value]);
  const isUpdateTaskList = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  const check_lists = useSelector((state: RootState) => state.check_lists);
  //receiving tasks from the server and saving them
  useEffect(() => {
    if (tasksFB) {
      const current_task = tasksFB.filter((task: any) => task.id === item.id);
      current_task[0]?.tasks && setValue(current_task[0]?.tasks);
    }
  }, [tasksFB]);
  //receiving data
  useEffect(() => {
    if (user || isUpdateTaskList || check_lists.isDeleteList) {
      fetchBackData(
        user.uid,
        `/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setTasksFB,
      );
    }
  }, [user, isUpdateTaskList, check_lists]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue?.current?.value.length === 0) {
      alert('заполните поле');
      return;
    }
    if (inputValue?.current) {
      const newValue = {
        title: inputValue?.current?.value,
        id: createId(),
      };
      setValue((prevValue) => [...prevValue, newValue]);

      addNewCheckbox(e);
      dispatch(isTaskUpdate(true));
      setIsOpen(false);
      setIsUpdate(true);

      const itemIndex = getListIndex(lists, item.id);
      dispatch(getCurrentListIndex(itemIndex));
    }
  };
  const deleteList = () => {
    const itemIndex = getListIndex(lists, item.id);
    dispatch(getCurrentListIndex(itemIndex));

    dispatch(isDeleteList(true));
  };

  const [isHideChecked, setIsHideChecked] = useState(false);
  const [hideText, setHideText] = useState('скрыть отмеченные');
  useEffect(() => {
    isHideChecked
      ? setHideText('показать отмеченные')
      : setHideText('скрыть отмеченные');
  }, [isHideChecked]);
  const hideChecked = () => {
    setIsHideChecked(!isHideChecked);
  };
  return (
    <>
      <div className=''>
        <div className='d-flex align-items-center justify-content-between'>
          <span>{item.title}</span>
          <button onClick={hideChecked}>{hideText}</button>
          <button onClick={deleteList}>удалить</button>
        </div>
        <ul className=''>
          {value?.map((checkbox, i) => {
            if (isHideChecked && checkbox.isChecked) {
              return;
            }
            return <CheckboxItem key={i} listId={item.id} item={checkbox} />;
          })}
        </ul>

        <button type='button' onClick={() => setIsOpen(!isOpen)}>
          добавить элемент
        </button>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} data-id={item.id}>
          <div className=''>
            <input type='text' ref={inputValue} onChange={handleInputChange} />
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
