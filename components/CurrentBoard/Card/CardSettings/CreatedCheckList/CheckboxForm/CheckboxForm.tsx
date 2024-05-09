import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {
  getCheckLists,
  getListIndex as getCurrentListIndex,
} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as createId} from 'uuid';
import {updateFirebaseData} from '@/helper/updateUserData';
import {useState, useEffect, FC} from 'react';
import TaskInput from './TaskInput/TaskInput';
import TaskList from './TaskList/TaskList';
import {isCardUpdate} from '@/store/card-setting/actions';
import {CheckListProps, CheckboxItemProps} from '@/types/interfaces';
import './CheckboxForm.scss';

interface CheckboxFormProps {
  item: CheckListProps;
  isHide: (value: boolean, id: string) => void;
  currentValue: (e: any) => void;
}

const CheckboxForm: FC<CheckboxFormProps> = ({item, currentValue, isHide}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [checkListsData, setCheckListsData] = useState<Array<CheckListProps>>();
  const [isHideCheckedItem, setIsHideCheckedList] = useState(false);
  const [hideText, setHideText] = useState('');

  const [itemTasks, setItemTasks] = useState<{
    [key: string]: CheckboxItemProps;
  }>({});

  const user = useSelector((state: RootState) => state.userdata);
  const dispatch: AppDispatch = useDispatch();

  const isUpdateTaskList = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  useEffect(() => {
    item?.isHideCheckedList && setIsHideCheckedList(item?.isHideCheckedList);
  }, [item.isHideCheckedList]);

  useEffect(() => {
    if (itemTasks && isUpdate) {
      currentValue(itemTasks);
      setIsUpdate(false);
    }
  }, [itemTasks]);
  useEffect(() => {
    if (user || isUpdateTaskList) {
      fetchBackDefaultData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setCheckListsData,
      );
    }
  }, [user, isUpdateTaskList]);
  useEffect(() => {
    setItemTasks({});
    if (checkListsData) {
      for (let key in checkListsData) {
        if (key === item.id) {
          if (checkListsData[key].tasks) {
            // sorting by order
            const sortedTasks: CheckboxItemProps[] = Object.values(
              checkListsData[key].tasks as Record<string, CheckboxItemProps>,
            ).sort((a, b) => a.order - b.order);

            // from array to object
            const sortedTasksObject: {[key: string]: CheckboxItemProps} =
              sortedTasks.reduce(
                (acc, task) => {
                  acc[task.id] = task;
                  return acc;
                },
                {} as {[key: string]: CheckboxItemProps},
              );
            // update item tasks
            setItemTasks(sortedTasksObject);
          }
        }
      }
    } else {
      dispatch(getCurrentListIndex(item.id));
      dispatch(getCheckLists({}));
    }
  }, [checkListsData]);

  const handleSubmit = (title: string) => {
    const id = createId();
    const order = Object.keys(itemTasks).length + 1;

    setItemTasks((prevValue: any) => ({
      ...prevValue,
      [id]: {title, id, order},
    }));
    setIsOpen(false);
    setIsUpdate(true);
    dispatch(getCurrentListIndex(item.id));
  };

  const deleteList = () => {
    const updatedTasks = {...checkListsData};
    delete updatedTasks[item?.id as any];
    dispatch(getCurrentListIndex(item.id));
    // dispatch(isDeleteList(true));
    dispatch(isCardUpdate(true));
    updateFirebaseData(
      `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
      {'check-lists': updatedTasks},
    );
  };

  const hideChecked = () => {
    setIsHideCheckedList(!isHideCheckedItem);
    isHide(!isHideCheckedItem, item.id);
  };

  useEffect(() => {
    Object.keys(itemTasks).map((item) => {
      if (!itemTasks[item].isChecked) {
        return;
      }
      isHideCheckedItem
        ? setHideText('Show checked item')
        : setHideText('Hide checked item');
    });
  }, [itemTasks]);

  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <div className='checkbox-form'>
      <div className='checkbox-form__container'>
        <div className='checkbox-form__row flex'>
          <p className='checkbox-form__title  text-underline'>{item.title}</p>
          <div className='checkbox-form__btns flex'>
            {Object.keys(itemTasks).length && hideText && (
              <button
                className='checkbox-form__button button-light-blue'
                onClick={hideChecked}
              >
                {hideText}
              </button>
            )}
            <button
              type='button'
              className='checkbox-form__button button-shade-gray'
              onClick={deleteList}
            >
              Deleted
            </button>
          </div>
        </div>
        <TaskList
          tasks={itemTasks}
          id={item.id}
          isHideChecked={isHideCheckedItem}
        />
      </div>
      {isOpen ? (
        <TaskInput onSubmit={handleSubmit} setIsOpen={(e) => setIsOpen(e)} />
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

export default CheckboxForm;
