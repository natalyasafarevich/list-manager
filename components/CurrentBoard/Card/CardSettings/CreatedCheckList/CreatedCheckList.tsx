'use client';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckboxForm from './CheckboxForm/CheckboxForm';
import {updateFirebaseData} from '@/helper/updateUserData';
import {getCurrentTask} from '@/store/check-lists/actions';
import {CheckListItemProps} from '@/types/interfaces';
import './CreatedCheckList.scss';

const CreatedCheckList: FC = () => {
  const [isPost, setIsPost] = useState(false);
  const [tasks, setTasks] = useState<Array<CheckListItemProps>>([]);

  const idList = useSelector((state: RootState) => state.check_lists);
  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const {dataLink} = user;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentTask(tasks, false));
  }, [tasks]);

  useEffect(() => {
    if (Object.keys(tasks).length !== 0 && isPost) {
      updateFirebaseData(
        `boards/${boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${idList.index}`,
        {
          tasks: tasks,
        },
      );
      setIsPost(false);

      return;
    }
  }, [tasks, isPost]);

  // hide/open checked items
  const getIsHide = (e: boolean) => {
    updateFirebaseData(
      `boards/${boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${idList.index}`,
      {
        isHideCheckedList: e,
      },
    );
  };

  return (
    <div className='created-checklist'>
      <div className='created-checklist__container'>
        {Object.keys(lists)?.map((item: any) => (
          <div className='created-checklist__item' key={lists[item].id}>
            <CheckboxForm
              isHide={getIsHide}
              item={lists[item]}
              key={lists[item].id}
              currentValue={(value) => {
                setIsPost(true);
                setTasks(value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedCheckList;
