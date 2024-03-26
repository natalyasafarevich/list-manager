import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateUserData} from '@/helper/updateUserData';
import {isTaskUpdate} from '@/store/check-lists/actions';
import {AppDispatch, RootState} from '@/store/store';
import {CheckListProps} from '@/types/interfaces';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListTasksProps} from '../AddItemForm/AddItemForm';
// import {v4 as createId} from 'uuid';
interface CheckboxItemProps {
  item: ListTasksProps;
  listId: string;
}

const CheckboxItem: FC<CheckboxItemProps> = ({item, listId}) => {
  const lists = useSelector((state: RootState) => state.check_lists.lists);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (item.isChecked) {
      setIsChecked(true);
    }
  }, [item]);

  const [index, setIndex] = useState<any>({
    list: null,
    checkbox: null,
  });

  const user = useSelector((state: RootState) => state.userdata);
  const {uid, dataLink} = user;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (index.list !== null && index.checkbox !== null) {
      updateUserData(
        `${uid}/boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}/check-lists/${index.list}/tasks/${index.checkbox}`,
        {
          isChecked: isChecked,
        },
      );
      dispatch(isTaskUpdate(true));
    }
  }, [index]);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    if (e.currentTarget.checked) {
      dispatch(isTaskUpdate(true));
    }
    const listIndex = getListIndex(lists, listId);
    setIndex((prev: any) => ({...prev, list: listIndex}));

    if (lists[listIndex]?.tasks) {
      lists[listIndex]?.tasks?.filter((checkbox, i) => {
        if (checkbox.id === item.id) {
          setIndex((prev: any) => ({...prev, checkbox: i}));
          return checkbox;
        }
      });
    }
  };
  return (
    <div>
      <input
        id={item.id}
        type='checkbox'
        checked={isChecked}
        onChange={checkboxChange}
      />
      <label className='m-1' htmlFor={item.id}>
        {item.title}
      </label>
    </div>
  );
};

export default CheckboxItem;
