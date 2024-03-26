'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.css';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {ColumnCardsProps} from '@/types/interfaces';
import CommentsAndDesc from './CommentsAndDesc/CommentsAndDesc';
import CardSideBar from '../CardSideBar/CardSideBar';
import CreatedCheckList from './CreatedCheckList/CreatedCheckList';

export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}

type CardSettingsProps = {
  card: ColumnCardsProps;
  setIsOpenCard: () => void;
};
export interface CommentProps {
  editDate?: string;
  title: string;
  id: string;
  createDate: string;
}
const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [columnName, setColumnName] = useState<string>('');
  const [allComments, setAllComment] = useState<Array<CommentProps>>([]);
  const [makers, setMarkers] = useState<Array<string>>([]);

  const current_markers = useSelector(
    (state: RootState) => state.markers.markers,
  );

  useEffect(() => {
    setMarkers(current_markers);
  }, [current_markers]);
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_column = useSelector((state: RootState) => state?.column.data);

  useEffect(() => {
    const columnIndex = getListIndex(boardLists, current_column.id);
    setColumnName(boardLists[columnIndex]?.name);
  }, [current_column, card, boardLists, allComments]);

  const closeSetting = () => {
    setIsOpenCard();
  };

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
          <button onClick={closeSetting}>x</button>
        </div>
        <div className=''>
          <span>метки</span>
          <div className='d-flex align-items-center'>
            {makers?.map((item, i) => (
              <div
                key={i}
                className='m-2'
                style={{width: '50px', height: '10px', background: item}}
              ></div>
            ))}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='w-50'>
            <CreatedCheckList></CreatedCheckList>
            <CommentsAndDesc card={card} />
          </div>
          <div className='w-25'>
            <CardSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
