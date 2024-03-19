'use client';
import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import TextEditor from '@/components/TextEditor/TextEditor';
import {fetchBackData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {ColumnCardsProps} from '@/types/interfaces';
import {v4 as uuidv4} from 'uuid';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CommentProps} from '../CardSettings';
import {getComments} from '@/store/card-setting/actions';
interface CardssP {
  card: ColumnCardsProps;
}
const CommentsAndDesc: FC<CardssP> = ({card}) => {
  const current_column = useSelector((state: RootState) => state?.column.data);
  const user = useSelector((state: RootState) => state.userdata);
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_board = useSelector((state: RootState) => state.boards);
  const [index, getIndex] = useState<any>({
    column: null,
    card: null,
  });
  const [description, setDescription] = useState<string>('');

  const [currentComment, getCurrentComment] = useState<any>();
  useEffect(() => {
    const cardIndex = getListIndex(current_column.cards, card.id);
    const columnIndex = getListIndex(boardLists, current_column.id);
    getIndex((prevState: any) => ({...prevState, column: columnIndex}));
    fetchBackData(
      user.uid,
      `/boards/${current_board.index}/lists/${columnIndex}/cards/${cardIndex}`,
      getCurrentComment,
    );
  }, [user, current_board, current_column, boardLists]);

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
  const [allComments, setAllComment] = useState<Array<CommentProps>>([]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (allComments.length !== 0) {
      dispatch(getComments(allComments));
    }
  }, [allComments]);
  const comments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );
  useEffect(() => {
    user.uid &&
      fetchBackData(
        user.uid,
        `/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        getCurrentCard,
      );
  }, [user]);
  // const [columnName, setColumnName] = useState<string>('');

  useEffect(() => {
    const cardIndex = getListIndex(current_column.cards, card.id);
    // getIndex((prevState: any) => ({...prevState, card: cardIndex}));
    const columnIndex = getListIndex(boardLists, current_column.id);
    getIndex((prevState: any) => ({
      ...prevState,
      column: columnIndex,
      card: cardIndex,
    }));
  }, [current_column, card, boardLists, allComments]);

  const [comment, setComment] = useState<string>('');
  useEffect(() => {
    if (currentComment?.comments) {
      dispatch(getComments(currentComment?.comments));
    }
  }, [currentComment]);

  useEffect(() => {
    if (comments.length !== 0) {
      // updateUserData(
      //   `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
      //   {comments: comments},
      // );
      console.log(
        `${user.uid}/boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
      );
    }
  }, [comments]);
  useEffect(() => {
    if (comment) {
      const comments = {
        title: comment,
        id: uuidv4(),
      };

      setAllComment((prev) => [...prev, comments]);
    }
  }, [comment]);
  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({
    title: '',
    description: '',
    id: '',
    comments: [],
  });
  return (
    <p>
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
    </p>
  );
};
export default CommentsAndDesc;
