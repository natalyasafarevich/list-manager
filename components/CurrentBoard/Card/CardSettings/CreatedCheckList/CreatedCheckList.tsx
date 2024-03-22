'use client';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckboxItem from './CheckboxItem/CheckboxItem';
import AddItemForm, {ListItem} from './AddItemForm/AddItemForm';
import {updateUserData} from '@/helper/updateUserData';
import {getCurrentTask} from '@/store/check-lists/actions';

const CreatedCheckList: FC = () => {
  const [isPost, setIsPost] = useState(false);
  const [tasks, setTasks] = useState<Array<ListItem>>([]);

  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const user = useSelector((state: RootState) => state.userdata);
  const idList = useSelector((state: RootState) => state.check_lists);
  const {uid, dataLink} = user;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentTask(tasks, false));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length !== 0 && isPost) {
      updateUserData(
        `${uid}/boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${idList.index}`,
        {
          tasks: tasks,
        },
      );
      setIsPost(false);
    }
  }, [tasks, isPost]);

  const addNewCheckbox = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <hr />
      <div className=''>
        {lists?.map((item) => (
          <AddItemForm
            item={item}
            key={item.id}
            addNewCheckbox={addNewCheckbox}
            currentValue={(value) => {
              setIsPost(true);
              setTasks(value);
            }}
          />
        ))}
      </div>
      <CheckboxItem />
      <hr />
    </div>
  );
};

export default CreatedCheckList;
