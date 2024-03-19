'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.css';
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateUserData} from '@/helper/updateUserData';
import {fetchBackData} from '@/helper/getFirebaseData';
import {ColumnCardsProps} from '@/types/interfaces';
import TextEditor from '@/components/TextEditor/TextEditor';
import {getComments} from '@/store/card-setting/actions';
import CommentsAndDesc from './CommentsAndDesc/CommentsAndDesc';

export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}

type CardSettingsProps = {
  card: ColumnCardsProps;
  setIsOpenCard: () => void;
};
export interface CommentProps {
  title: string;
  id: string;
}
const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [columnName, setColumnName] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  // const [comment, setComment] = useState<string>('');
  const [allComments, setAllComment] = useState<Array<CommentProps>>([]);

  // useEffect(() => {
  //   if (comment) {
  //     const comments = {
  //       title: comment,
  //       id: uuidv4(),
  //     };
  //     console.log(comment);
  //     setAllComment((prev) => [...prev, comments]);
  //   }
  // }, [comment]);

  // const dispatch: AppDispatch = useDispatch();
  // useEffect(() => {
  //   if (allComments.length !== 0) {
  //     dispatch(getComments(allComments));
  //   }
  // }, [allComments]);
  const [index, getIndex] = useState<any>({
    column: null,
    card: null,
  });
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_column = useSelector((state: RootState) => state?.column.data);

  // const comments = useSelector(
  //   (state: RootState) => state.card_setting.comments,
  // );
  const [currentComment, getCurrentComment] = useState<any>();
  const current_board = useSelector((state: RootState) => state.boards);
  const user = useSelector((state: RootState) => state.userdata);

  // useEffect(() => {
  //   if (currentComment?.comments) {
  //     dispatch(getComments(currentComment?.comments));
  //   }
  // }, [currentComment]);
  // useEffect(() => {
  //   const cardIndex = getListIndex(current_column.cards, card.id);
  //   const columnIndex = getListIndex(boardLists, current_column.id);
  //   getIndex((prevState: any) => ({...prevState, column: columnIndex}));
  //   fetchBackData(
  //     user.uid,
  //     `/boards/${current_board.index}/lists/${columnIndex}/cards/${cardIndex}`,
  //     getCurrentComment,
  //   );
  // }, [user, current_board, current_column, boardLists]);
  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({
    title: '',
    description: '',
    id: '',
    comments: [],
  });

  // useEffect(() => {
  //   if (comments.length !== 0) {
  //     updateUserData(
  //       `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
  //       {comments: comments},
  //     );
  //   }
  // }, [comments]);

  // useEffect(() => {
  //   description &&
  //     updateUserData(
  //       `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
  //       {description: description},
  //     );
  //   fetchBackData(
  //     user.uid,
  //     `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
  //     getCurrentCard,
  //   );
  // }, [index, description, user, current_board]);

  // useEffect(() => {
  //   user.uid &&
  //     fetchBackData(
  //       user.uid,
  //       `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
  //       getCurrentCard,
  //     );
  // }, [user]);
  useEffect(() => {
    const cardIndex = getListIndex(current_column.cards, card.id);
    getIndex((prevState: any) => ({...prevState, card: cardIndex}));
    const columnIndex = getListIndex(boardLists, current_column.id);
    setColumnName(boardLists[columnIndex]?.name);
  }, [current_column, card, boardLists, allComments]);

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

        <CommentsAndDesc card={card} />
      </div>
    </div>
  );
};

export default CardSettings;
