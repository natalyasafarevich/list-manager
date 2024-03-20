'use client';
import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import TextEditor from '@/components/TextEditor/TextEditor';
import {fetchBackData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {ColumnCardsProps} from '@/types/interfaces';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '@/store/card-setting/actions';
interface CommentsAndDescProps {
  card: ColumnCardsProps;
}
const CommentsAndDesc: FC<CommentsAndDescProps> = ({card}) => {
  const current_column = useSelector((state: RootState) => state?.column.data);
  const [comment, setComment] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const user = useSelector((state: RootState) => state.userdata);
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_board = useSelector((state: RootState) => state.boards);
  const [index, getIndex] = useState<any>({
    column: null,
    card: null,
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    description &&
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {description: description},
      );
  }, [index, description, user, current_board]);

  const comments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );
  useEffect(() => {
    if (index.column !== null && index.card !== null) {
      fetchBackData(
        user.uid,
        `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        getCurrentCard,
      );
    }
  }, [user, card.id, current_column, boardLists, index]);

  useEffect(() => {
    if (card.id) {
      const cardIndex = getListIndex(current_column.cards, card.id);
      const columnIndex = getListIndex(boardLists, current_column.id);
      getIndex((prevState: any) => ({
        ...prevState,
        column: columnIndex,
        card: cardIndex,
      }));
    }
  }, [card.id, current_column, boardLists]);

  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({
    title: '',
    description: '',
    id: '',
    comments: [],
  });

  useEffect(() => {
    dispatch(getComments(currentCard?.comments as []));
  }, [currentCard]);
  useEffect(() => {
    if (
      comments &&
      comments?.length !== 0 &&
      index.column !== null &&
      index.column !== -1 &&
      index.card !== null &&
      index.card !== -1
    ) {
      updateUserData(
        `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {comments: comments},
      );
    }
  }, [comments, index]);

  return (
    <>
      <p>oписание</p>
      <TextEditor
        isArray={false}
        backDescription={currentCard?.description as string}
        getHTML={(e) => setDescription(e)}
        title='oписание'
      />
      <TextEditor
        isArray={true}
        getHTML={(e) => setComment(e)}
        title={'title'}
      />
    </>
  );
};
export default CommentsAndDesc;
