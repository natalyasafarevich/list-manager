'use client';
import {FC, useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';

import {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import {v4 as uuidv4} from 'uuid';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {CommentProps} from '../CurrentBoard/Card/CardSettings/CardSettings';
import {getListIndex} from '../CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {getComments, isCardUpdate} from '@/store/card-setting/actions';
import {formatDate} from '@/helper/formatDate';
import EditorToolbar from './EditorToolbar/EditorToolbar';
import EditorContent from './EditorContent/EditorContent';
import CommentsSection from './CommentsSection/CommentsSection';
// import {stripHtmlTags} from '@/helper/stripHtmlTags';
import {EditorState} from '@/types/interfaces';

import './TextEditor.scss';

Quill.register('modules/imageResize', ImageResize);

interface TextEditorProps {
  title: string;
  getHTML?: (value: string) => void;
  firebaseDescription?: string;
  hasComments?: boolean;
}

const TextEditor: FC<TextEditorProps> = ({title, getHTML, firebaseDescription, hasComments}) => {
  const [state, setState] = useState<EditorState>({
    currentTitle: title,
  } as EditorState);

  const [comments, setComments] = useState<Array<CommentProps>>([]);

  const {owner} = useSelector((state: RootState) => state.comments);

  const commentsData = useSelector((state: RootState) => state.card_setting.comments);
  const {user_status, uid, additional_info, displayName} = useSelector((state: RootState) => state.userdata);

  const isLoggedIn = !!uid && user_status !== 'guest';

  const dispatch: AppDispatch = useDispatch();

  //get description from firebase
  useEffect(() => {
    if (firebaseDescription !== undefined) {
      setState((prevState) => ({
        ...prevState,
        editorHtml: firebaseDescription,
      }));
    }
    if (commentsData) {
      setComments(commentsData);
    }
  }, [firebaseDescription, commentsData]);

  const resetState = () => {
    setState((prevState) => ({
      ...prevState,
      currentTitle: state.editorHtml,
      isOpen: false,
      isSave: false,
    }));
  };

  //update comments
  useEffect(() => {
    const editDate = formatDate(new Date());
    if (state.isSave) {
      if (!hasComments && state.editorHtml) {
        dispatch(isCardUpdate(true));
        getHTML?.(state.editorHtml || '');
        resetState();
        return;
      }

      // find a comment which needs to update
      const updatedComments = comments.map((item) =>
        item.id === state.commentsInfo.id
          ? {
              ...item,
              title: state.editorHtml,
              editDate,
            }
          : item,
      );

      getHTML?.(state.editorHtml || '');
      dispatch(isCardUpdate(true));
      dispatch(getComments(updatedComments));
      resetState();
    }
  }, [state.editorHtml, state.isSave]);

  const ReactQuillChange = (html: string) => {
    // const textWithoutTags = stripHtmlTags(html);
    if (html.length) {
      setState((prevState) => ({
        ...prevState,
        editorHtml: html,
      }));
    }
  };
  // the comment changes
  const changeComment = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    const id = currentTarget?.dataset?.id || '';
    const foundedComment = comments.find((item) => item.id === id);
    const commentIndex = getListIndex(comments, id);
    setState((prevState) => ({
      ...prevState,
      commentsInfo: {
        id,
        index: commentIndex || 0,
        editDate: '',
      },
      editorHtml: foundedComment?.title || '',
    }));
  };

  // add a new comment
  const addComment = () => {
    const editDate = formatDate(new Date());
    const newId = uuidv4();
    const newComment: CommentProps = {
      id: newId,
      title: '',
      owner: uid,
      createDate: editDate,
      photoUrl: additional_info.mainPhoto.url as string,
      name: displayName as string,
    };
    setState((prevState) => ({
      ...prevState,
      editorHtml: '',
      commentsInfo: {
        id: newId,
        index: comments.length,
        editDate,
      },
    }));
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // save the edited comment
  const saveComments = () => {
    // let textWithoutTags = stripHtmlTags(state.editorHtml);
    if (!state.editorHtml.length) {
      setState((prevState) => ({
        ...prevState,
        isOpen: false,
        isSave: false,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      // editorHtml: textWithoutTags,
      isSave: true,
    }));
    dispatch(isCardUpdate(true));
  };

  const cancelClick = () => {
    dispatch(isCardUpdate(false));
    setState((prevState) => ({
      ...prevState,
      editorHtml: '',
      isSave: false,
      isOpen: false,
    }));
  };
  const editText = () => {
    if (!owner.length) {
      setState((prevState) => ({
        ...prevState,
        prevValue: state.editorHtml,
        isOpen: !prevState.isOpen,
      }));
      return;
    }
    if (!isLoggedIn || owner !== uid) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      prevValue: state.editorHtml,
      isOpen: !prevState.isOpen,
    }));
  };

  return (
    <div className='text-editor '>
      {state.isOpen ? (
        <div className='text-editor__container ql-editor'>
          <div className='flex'>
            {hasComments && (
              <>
                <div
                  className='comments-section__image'
                  style={{
                    background: `center/cover no-repeat url(${additional_info.mainPhoto.url})`,
                  }}
                ></div>
                <button
                  type='button'
                  className='text-editor__button text-editor__button__send'
                  onClick={saveComments}
                ></button>
              </>
            )}
            <EditorContent value={state.editorHtml} onChange={ReactQuillChange} />
          </div>
          <EditorToolbar onCancel={cancelClick} onSave={saveComments} />
        </div>
      ) : (
        <div className='text-editor__description ql-editor' onClick={isLoggedIn ? editText : () => {}}>
          {!hasComments &&
            (state.editorHtml ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: state.editorHtml,
                }}
              ></div>
            ) : (
              <span>{state.currentTitle}</span>
            ))}
        </div>
      )}
      <div className='text-editor__box' onClick={editText}>
        {isLoggedIn && !state.isOpen && (
          <div className='comments-section__row flex'>
            <div
              className='comments-section__image'
              style={{
                background: `center/cover no-repeat url(${additional_info?.mainPhoto?.url || '/default-image.svg'})`,
              }}
            ></div>

            <p className='comments-section__button' onClick={addComment}>
              Add comments
            </p>
          </div>
        )}

        {hasComments && !state.isOpen && (
          <CommentsSection commentsData={comments} isLoggedIn={isLoggedIn} onChangeComment={changeComment} />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
