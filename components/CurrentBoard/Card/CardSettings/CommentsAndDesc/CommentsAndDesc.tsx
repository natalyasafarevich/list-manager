'use client';
import {getListIndex} from '@/components/CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import TextEditor from '@/components/TextEditor/TextEditor';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {ColumnCardsProps} from '@/types/interfaces';
import {FC, ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments, isCardUpdate} from '@/store/card-setting/actions';
import {getUpdateLink} from '@/store/data-user/actions';
import {stripHtmlTags} from '@/helper/stripHtmlTags';
import './CommentsAndDesc.scss';

interface CommentsAndDescProps {
  card: ColumnCardsProps;
  children: ReactNode;
}

const CommentsAndDesc: FC<CommentsAndDescProps> = ({card, children}) => {
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
  const boardLists = useSelector((state: RootState) => state.boards.currentBoards.lists);
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
  const isUpdate = useSelector((state: RootState) => state.card_setting.isUpdate);
  useEffect(() => {
    let textWithoutTags = stripHtmlTags(description);

    // if (isUpdate) {
    //   updateFirebaseData(
    //     `boards/${current_board.index}/lists/${index.column}/cards/${index.card}`,
    //     {description: textWithoutTags.length ? description : ''},
    //   );
    //   dispatch(isCardUpdate(false));
    // }
    console.log(description, 'description');
    description &&
      updateFirebaseData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, {
        description: textWithoutTags.length ? description : '',
      });
  }, [index, description, user, current_board, isUpdate]);

  const comments = useSelector((state: RootState) => state.card_setting.comments);

  useEffect(() => {
    if (isUpdate) {
      fetchBackDefaultData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, getCurrentCard);
      dispatch(isCardUpdate(false));
      return;
    }
    if (index.column !== null && index.card !== null) {
      fetchBackDefaultData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, getCurrentCard);
      // dispatch(isCardUpdate(false));
    }
  }, [user, index, isUpdate]);

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
  }, [currentCard.comments.length]);

  useEffect(() => {
    if (
      comments &&
      comments?.length !== 0 &&
      index.column !== null &&
      index.column !== -1 &&
      index.card !== null &&
      index.card !== -1
    ) {
      console.log(comments.length, index, isUpdate, 'sgffg');
      updateFirebaseData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, {
        comments: comments,
      });
    }
  }, [comments.length, index]);

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
        <div>{children}</div>
        <div className='comments-desc__comments-box'>
          <p className='comments-desc__title flex '>
            <span className='text-underline' data-quantity={comments?.length || 0}>
              Comments
            </span>
          </p>
          <TextEditor hasComments={true} getHTML={(e) => e} title={'title'} />
        </div>
      </div>
    </div>
  );
};
export default CommentsAndDesc;
