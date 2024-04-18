'use client';
import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import TextEditor from '@/components/TextEditor/TextEditor';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {ColumnCardsProps} from '@/types/interfaces';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '@/store/card-setting/actions';
import {getUpdateLink} from '@/store/data-user/actions';
import './CommentsAndDesc.scss';
interface CommentsAndDescProps {
  card: ColumnCardsProps;
}
export const stripHtmlTags = (html: string) => {
  // Создаем регулярное выражение для поиска HTML-тегов
  const regex = /(<([^>]+)>)/gi;
  // Заменяем HTML-теги на пустую строку
  return html.replace(regex, '');
};

const CommentsAndDesc: FC<CommentsAndDescProps> = ({card}) => {
  const current_column = useSelector((state: RootState) => state?.column.data);
  const [comment, setComment] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({
    title: '',
    description: '',
    id: '',
    comments: [],
  });
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
    if (index.column !== null && index.card !== null) {
      const link = {
        boardIndex: current_board.index,
        listIndex: index.column,
        cardIndex: index.card,
        uid: user.uid,
      };
      dispatch(getUpdateLink(link));
    }
  }, [index]);

  useEffect(() => {
    let textWithoutTags = stripHtmlTags(description);
    // console.log(textWithoutTags.length);
    description &&
      updateFirebaseData(
        `boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {description: textWithoutTags.length ? description : ''},
      );
  }, [index, description, user, current_board]);

  const comments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );
  useEffect(() => {
    if (index.column !== null && index.card !== null) {
      fetchBackDefaultData(
        `boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
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
      updateFirebaseData(
        `boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
        {comments: comments},
      );
    }
  }, [comments, index]);

  return (
    <div className='comments-desc'>
      <div className='comments-desc__container'>
        <p className='comments-desc__title flex'>
          <span className=' text-underline'>Card description</span>
        </p>
        <div className='comments-desc__desc-box'>
          <TextEditor
            hasComments={false}
            firebaseDescription={currentCard?.description as string}
            getHTML={(e) => setDescription(e)}
            title='Write some words'
          />
        </div>
        <div className='comments-desc__comments-box'>
          <p className='comments-desc__title flex '>
            <span className='text-underline'>Comments</span>
          </p>
          <TextEditor hasComments={true} getHTML={(e) => e} title={'title'} />
        </div>
      </div>
    </div>
  );
};
export default CommentsAndDesc;
