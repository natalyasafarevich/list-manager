'use client';
import {updateUserData} from '@/helper/updateUserData';
import {isCopyColumn} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
interface CopyColumnProps {
  setValue: (a: string) => void;
  list: Array<any>;
  value: string;
}
const CopyColumn: FC<CopyColumnProps> = ({setValue, list, value}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state.boards);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isCopyColumn({isCopy: true}));
    // console.log(list);
    updateUserData(
      `${user.uid}/boards/${current_board?.index}/lists/${current_board?.currentBoards?.lists?.length}/`,
      {cards: list, id: uuidv4(), name: value},
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Название</label>
        <input
          name=''
          id='name'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button type='submit'>save</button>
      </form>
    </>
  );
};

export default CopyColumn;
