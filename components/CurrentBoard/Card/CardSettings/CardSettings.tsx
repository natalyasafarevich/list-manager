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
import {updateUserData} from '@/helper/updateUserData';
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
  const [index, getIndex] = useState<any>({
    column: null,
    card: null,
  });
  const user = useSelector((state: RootState) => state.userdata);
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_column = useSelector((state: RootState) => state?.column.data);

  const current_board = useSelector((state: RootState) => state.boards);
  useEffect(() => {
    // const cardIndex = getListIndex(current_column.cards, card.id);
    description &&
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {description: description},
      );
    // getIndex((prevState:any) => ({ ...prevState, card: cardIndex }));
  }, [index, description, user, current_board]);
  useEffect(() => {
    const cardIndex = getListIndex(current_column.cards, card.id);
    // updateUserData(
    //   `${user.uid}/boards/${current_board.index}/lists/${indexCL}/cards/${}`,
    //   {cards},
    // );
    getIndex((prevState: any) => ({...prevState, card: cardIndex}));
  }, [current_column, card]);

  useEffect(() => {
    const columnIndex = getListIndex(boardLists, current_column.id);
    setColumnName(boardLists[columnIndex]?.name);
    getIndex((prevState: any) => ({...prevState, column: columnIndex}));
  }, [boardLists, current_column]);

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
      </div>
    </div>
  );
};

export default CardSettings;
