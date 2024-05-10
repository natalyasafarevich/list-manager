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

interface IndexState {
  column: number | null;
  card: number | null;
}
interface CommentsAndDescProps {
  card: ColumnCardsProps;
  children: ReactNode;
}

const CommentsAndDesc: FC<CommentsAndDescProps> = ({card, children}) => {
  const [description, setDescription] = useState<string>('');
  const [currentCard, getCurrentCard] = useState<ColumnCardsProps>({} as ColumnCardsProps);
  const [index, getIndex] = useState<IndexState>({column: null, card: null} as IndexState);

  const {uid, user_status} = useSelector((state: RootState) => state.userdata);
  const {isUpdate, comments} = useSelector((state: RootState) => state.card_setting);
  const boardLists = useSelector((state: RootState) => state.boards.currentBoards.lists);
  const current_board = useSelector((state: RootState) => state.boards);
  const current_column = useSelector((state: RootState) => state?.column.data);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (index.column !== null && index.card !== null) {
      const link = {
        boardIndex: current_board.index,
        listIndex: index.column,
        cardIndex: index.card,
        uid: uid,
      };
      dispatch(getUpdateLink(link));
    }

    if (index.column !== null && index.card !== null && description !== '') {
      let textWithoutTags = stripHtmlTags(description);
      updateFirebaseData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, {
        description: textWithoutTags.length ? description : '',
      });
    }
  }, [index, description, uid, current_board]);

  useEffect(() => {
    dispatch(getComments(currentCard?.comments as []));
  }, [currentCard.comments]);

  useEffect(() => {
    if (isUpdate || (index.column !== null && index.card !== null)) {
      fetchBackDefaultData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, getCurrentCard);
      if (isUpdate) {
        dispatch(isCardUpdate(false));
      }
    }
  }, [uid, index, isUpdate, current_board]);

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
    if (comments?.length && [null, -1].every((val) => ![index.column, index.card].includes(val))) {
      updateFirebaseData(`boards/${current_board.index}/lists/${index.column}/cards/${index.card}`, {
        comments: comments,
      });
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
        <div>{children}</div>
        {user_status === 'guest' ? (
          <p className='note'>Guests cannot view or write comments</p>
        ) : (
          <div className='comments-desc__comments-box'>
            <p className='comments-desc__title flex '>
              <span className='text-underline' data-quantity={comments?.length || 0}>
                Comments
              </span>
            </p>
            <TextEditor hasComments={true} getHTML={(e) => e} title={'title'} />
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentsAndDesc;
