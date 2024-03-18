'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.css';
import {CardDisplayProps, CardProps} from '../CardDisplay/CardDisplay';

import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {fetchData} from '../../Column/ArchivedСolumns/ArchivedСolumns';
import {it} from 'node:test';
import CardDescription from './CardDescription/CardDescription';
export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}
type CardSettingsProps = {
  card: CardProps;
  setIsOpenCard: () => void;
};
const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [columnName, setColumnName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  useEffect(() => {
    console.log(description);
  }, [description]);
  const board = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_column = useSelector((state: RootState) => state?.column.data);

  useEffect(() => {
    const columnIndex = getListIndex(board, current_column.id);
    setColumnName(board[columnIndex]?.name);
  }, [board, current_column]);

  return (
    <div className='card-settings'>
      <div className='card-settings__container'>
        <div className='d-flex justify-content-between align-items-center'>
          <span className=''>
            <b> {card.title}</b>
            <br />
            <span className=''>
              в колонке: <b> {columnName}</b>
            </span>
          </span>
          <button onClick={setIsOpenCard}>x</button>
        </div>
        <CardDescription getHTML={(e) => setDescription(e)} />
        <div
          className='btn-secondary__'
          dangerouslySetInnerHTML={{__html: description}}
        ></div>
      </div>
    </div>
  );
};

export default CardSettings;
