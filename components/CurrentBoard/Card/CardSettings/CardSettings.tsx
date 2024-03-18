'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.css';
import {CardDisplayProps, CardProps} from '../CardDisplay/CardDisplay';

import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {fetchData} from '../../Column/ArchivedСolumns/ArchivedСolumns';
import {it} from 'node:test';
export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}
type CardSettingsProps = {
  card: CardProps;
  setIsOpenCard: () => void;
};
const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [boardName, setBoardName] = useState<string>('');
  const [data, setData] = useState<any>();

  const board = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const user = useSelector((state: RootState) => state.userdata);
  const current_column = useSelector((state: RootState) => state?.column.data);
  const current_board = useSelector((state: RootState) => state?.boards);

  useEffect(() => {
    const columnIndex = getListIndex(board, current_column.id);
    setBoardName(board[columnIndex]?.name);
  }, [board, current_column]);

  return (
    <div className='card-settings'>
      <div className='card-settings__container'>
        <div className='d-flex justify-content-between align-items-center'>
          <span className=''>
            {card.title}
            <br />
            <span className=''>в колонке: {boardName}</span>
          </span>
          <button onClick={setIsOpenCard}>x</button>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
