'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isCopyColumn} from '@/store/column-setting/actions';

import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {getListIndex} from '../ArchiveColumn/ArchiveColumn';
interface CopyColumnProps {
  setValue: (a: string) => void;
  list: Array<any>;
  value: string;
}
const CopyColumn: FC<CopyColumnProps> = ({setValue, list, value}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state.boards);
  const current_column = useSelector((state: RootState) => state.column.data);

  const [currentCard, setCurrentCard] = useState();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const cardIndex = getListIndex(
      current_board?.currentBoards?.lists,
      current_column.id,
    );

    fetchBackDefaultData(
      `boards/${current_board?.index}/lists/${cardIndex}/cards`,
      setCurrentCard,
    );
  }, [user, current_column, current_board]);
  useEffect;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isCopyColumn({isCopy: true}));
    updateFirebaseData(
      `boards/${current_board?.index}/lists/${current_board?.currentBoards?.lists?.length}/`,
      {cards: currentCard, id: uuidv4(), name: value},
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
