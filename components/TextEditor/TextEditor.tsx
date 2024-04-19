'use client';
import {FC, useEffect, useState} from 'react';
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
import 'react-quill/dist/quill.snow.css';
import './TextEditor.scss';
import {stripHtmlTags} from '../CurrentBoard/Card/CardSettings/CommentsAndDesc/CommentsAndDesc';

Quill.register('modules/imageResize', ImageResize);

interface TextEditorProps {
  title: string;
  getHTML?: (value: string) => void;
  firebaseDescription?: string;
  hasComments?: boolean;
}

const TextEditor: FC<TextEditorProps> = ({
  title,
  getHTML,
  firebaseDescription,
  hasComments,
}) => {
  const [state, setState] = useState({
    prevValue: '',
    isSave: false,
    isOpen: false,
    currentTitle: title,
    editorHtml: '',
    commentsInfo: {id: '', index: 0, editDate: ''},
  });
  const [comments, setComments] = useState<Array<CommentProps>>([]);

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState) => ({...prevState, ...newState}));
  };
  const allComments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );
  const user_status = useSelector((state: RootState) => state.userdata);

  const isLoggedIn = !!user_status.uid && user_status.user_status !== 'guest';

  const dispatch: AppDispatch = useDispatch();

  //get description from firebase
  useEffect(() => {
    if (firebaseDescription !== undefined) {
      setState((prevState) => ({
        ...prevState,
        editorHtml: firebaseDescription,
      }));
    }
  }, [firebaseDescription]);

  //get all comments from firebase
  useEffect(() => {
    if (allComments) {
      setComments(allComments);
    }
  }, [allComments]);

  //update comments
  useEffect(() => {
    const editDate = formatDate(new Date());
    if (state.isSave) {
      if (!hasComments && state.editorHtml) {
        dispatch(isCardUpdate(true));
      }
      // find a comment which needs to update
      const updatedComments = comments.map((item) =>
        item.id === state.commentsInfo.id
          ? {...item, title: state.editorHtml, editDate}
          : item,
      );

      dispatch(getComments(updatedComments));

      setState((prevState) => ({
        ...prevState,
        currentTitle: state.editorHtml,
        isOpen: false,
        isSave: false,
      }));

      getHTML?.(state.editorHtml || '');
    }
  }, [state.isSave, state.editorHtml]);

  const ReactQuillChange = (html: string) => {
    let textWithoutTags = stripHtmlTags(html);
    if (!textWithoutTags.length) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      editorHtml: html,
    }));
  };

  // the comment changes
  const changeComment = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    const id = currentTarget?.dataset?.id || '';

    const foundComment = comments.find((item) => item.id === id);
    const commentIndex = getListIndex(comments, id);

    setState((prevState) => ({
      ...prevState,
      commentsInfo: {
        id: id,
        index: commentIndex as number,
        editDate: '',
      },
    }));

    foundComment &&
      setState((prevState) => ({
        ...prevState,
        editorHtml: foundComment.title,
      }));
  };
  // console.log(comments);
  // add a new comment
  const addComment = () => {
    const editDate = formatDate(new Date());
    const newId = uuidv4();
    const newComment: CommentProps = {
      id: newId,
      title: '',
      owner: user_status.uid,
      createDate: editDate,
      photoUrl: user_status.photoURL as string,
      name: user_status.displayName as string,
    };

    setState((prevState) => ({
      ...prevState,
      editorHtml: '',
      commentsInfo: {
        id: newId,
        index: comments.length,
        editDate: editDate,
      },
    }));
    // if (!newComment.title.length) {
    //   return;
    // }
    setComments((prevComments) => [...prevComments, newComment]);
  };
  // save the edited comment
  const saveComments = () => {
    let textWithoutTags = stripHtmlTags(state.editorHtml);
    if (!textWithoutTags.length) {
      setState((prevState) => ({
        ...prevState,
        isOpen: false,
        isSave: false,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isSave: true,
    }));
    dispatch(isCardUpdate(true));
  };
  const cancelClick = () => {
    setState((prevState) => ({
      ...prevState,
      editorHtml: '',
      isSave: false,
      isOpen: false,
    }));
  };

  // edit text
  const editText = () => {
    // let textWithoutTags = stripHtmlTags(description);
    if (!isLoggedIn) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      prevValue: state.editorHtml,
      isOpen: !prevState.isOpen,
    }));
  };

  return (
    <div className='text-editor'>
      {state.isOpen ? (
        <div className='text-editor__container'>
          <div className='flex'>
            {hasComments && (
              <>
                <div
                  className='comments-section__image'
                  style={{
                    background: `center/cover no-repeat url(${user_status.photoURL})`,
                  }}
                ></div>
                <button
                  type='button'
                  className='text-editor__button text-editor__button__send'
                  onClick={saveComments}
                ></button>
                {/* <button
                  type='button'
                  className='button-close text-editor__button'
                  onClick={cancelClick}
                ></button> */}
              </>
            )}
            <EditorContent
              value={state.editorHtml}
              onChange={ReactQuillChange}
            />
          </div>
          <EditorToolbar onCancel={cancelClick} onSave={saveComments} />
        </div>
      ) : (
        <div className='text-editor__description' onClick={editText}>
          {!hasComments &&
            (state.editorHtml ? (
              <div dangerouslySetInnerHTML={{__html: state.editorHtml}}></div>
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
                background: `center/cover no-repeat url(${user_status.photoURL})`,
              }}
            ></div>

            <p className='comments-section__button' onClick={addComment}>
              Add comments
            </p>
          </div>
        )}

        {hasComments && !state.isOpen && (
          <CommentsSection
            // addComment={addComment}
            comments={comments}
            isLoggedIn={isLoggedIn}
            changeComment={changeComment}
            isOpen={state.isOpen}
            setOpen={(e) =>
              setState((prevState) => ({
                ...prevState,
                isOpen: e,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
