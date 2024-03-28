'use client';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AddItemForm from './AddItemForm/AddItemForm';
import {updateUserData} from '@/helper/updateUserData';
import {getCurrentTask} from '@/store/check-lists/actions';
import {CheckListProps} from '@/types/interfaces';
import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';

const CreatedCheckList: FC = () => {
  const [isPost, setIsPost] = useState(false);
  const [tasks, setTasks] = useState<Array<CheckListProps>>([]);
  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const user = useSelector((state: RootState) => state.userdata);
  const idList = useSelector((state: RootState) => state.check_lists);

  const {uid, dataLink} = user;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentTask(tasks, false));
  }, [tasks]);
  // const [isHide, setIsHide] = useState(false);
  // useEffect(() => {
  //   console.log(isHide, 'ggrgr');
  // }, [isHide]);
  useEffect(() => {
    if (tasks.length !== 0 && isPost) {
      updateUserData(
        `${uid}/boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${idList.index}`,
        {
          tasks: tasks,
        },
      );
      setIsPost(false);

      return;
    }
  }, [tasks, isPost]);

  useEffect(() => {
    idList.isDeleteList &&
      updateUserData(
        `${uid}/boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${idList.index}`,
        {
          isDelete: idList.isDeleteList,
        },
      );
  }, [idList]);
  const addNewCheckbox = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const getIsHide = (e: boolean, id: string) => {
    const listIndex = getListIndex(idList.lists, id);
    console.log(e);
    updateUserData(
      `${uid}/boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${listIndex}`,
      {
        isHideCheckedList: e,
      },
    );
  };
  return (
    <div className=''>
      <div className=''>
        {lists?.map((item) => (
          <div key={item.id}>
            {item.isDelete ? (
              <></>
            ) : (
              <>
                <hr />
                <AddItemForm
                  isHide={getIsHide}
                  item={item}
                  key={item.id}
                  addNewCheckbox={addNewCheckbox}
                  currentValue={(value) => {
                    setIsPost(true);
                    setTasks(value);
                  }}
                />
                <hr />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedCheckList;
