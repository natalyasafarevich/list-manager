'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.css';
import {CardDisplayProps} from '../CardDisplay/CardDisplay';

import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import CardDescription from './CardDescription/CardDescription';
import {updateUserData} from '@/helper/updateUserData';
import {fetchBackData, getFirebaseData} from '@/helper/getFirebaseData';
import {ColumnCardsProps} from '@/types/interfaces';

export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}

type CardSettingsProps = {
  card: ColumnCardsProps;
  setIsOpenCard: () => void;
};

const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [columnName, setColumnName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({
    title: '',
    description: '',
    id: '',
  });
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

  // post data & get data
  useEffect(() => {
    description &&
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {description: description},
      );
    fetchBackData(
      user.uid,
      `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
      getCurrentCard,
    );
  }, [index, description, user, current_board]);

  useEffect(() => {
    user.uid &&
      fetchBackData(
        user.uid,
        `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        getCurrentCard,
      );
  }, [user]);

  //get index
  useEffect(() => {
    const cardIndex = getListIndex(current_column.cards, card.id);
    getIndex((prevState: any) => ({...prevState, card: cardIndex}));
    const columnIndex = getListIndex(boardLists, current_column.id);
    setColumnName(boardLists[columnIndex]?.name);
    getIndex((prevState: any) => ({...prevState, column: columnIndex}));
  }, [current_column, card, boardLists]);

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
        <CardDescription
          backDescription={currentCard?.description as string}
          getHTML={(e) => setDescription(e)}
        />
      </div>
    </div>
  );
};

export default CardSettings;
