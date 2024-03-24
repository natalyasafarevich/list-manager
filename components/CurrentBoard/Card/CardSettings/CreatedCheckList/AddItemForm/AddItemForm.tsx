import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {fetchBackData} from '@/helper/getFirebaseData';
import {getListIndex as getCurrentListIndex} from '@/store/check-lists/actions';
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
export interface ListTasksProps {
  title: string;
  id: string;
}
export interface ListItem {
  id: string;
  title: string;
  tasks?: Array<ListTasksProps>;
}

interface Props {
  item: ListItem;
  addNewCheckbox: (e: any) => void;
  currentValue: (e: any) => void;
}

const AddItemForm: FC<Props> = ({item, addNewCheckbox, currentValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState<Array<ListTasksProps>>([]);
  const [tasksFB, setTasksFB] = useState<Array<ListItem>>();

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

  //receiving tasks from the server and saving them
  useEffect(() => {
    if (tasksFB) {
      const current_task = tasksFB.filter((task: any) => task.id === item.id);
      current_task[0]?.tasks && setValue(current_task[0]?.tasks);
    }
  }, [tasksFB]);

  //receiving data
  useEffect(() => {
    if (user) {
      fetchBackData(
        user.uid,
        `/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setTasksFB,
      );
    }
  }, [user]);

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

      setIsOpen(false);
      setIsUpdate(true);

      const itemIndex = getListIndex(lists, item.id);
      dispatch(getCurrentListIndex(itemIndex));
    }
  };

  return (
    <>
      <div>
        <p>{item.title}</p>
        <ul className=''>
          {value?.map((item) => <CheckboxItem item={item} />)}
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
