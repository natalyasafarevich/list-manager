'use client';
import {formats, modules} from '@/variables/edit';
import {FC, useEffect, useRef, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import {v4 as uuidv4} from 'uuid';
import 'react-quill/dist/quill.snow.css';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {CommentProps} from '../CurrentBoard/Card/CardSettings/CardSettings';
import {getListIndex} from '../CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {getComments, isCardUpdate} from '@/store/card-setting/actions';
import {formatDate} from '@/helper/formatDate';
import './TextEditor.scss';

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

  useEffect(() => {
    if (firebaseDescription !== undefined) {
      setState((prevState) => ({
        ...prevState,
        editorHtml: firebaseDescription,
      }));
    }

    if (allComments) {
      setComments(allComments);
    }

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
      // update states
      setState((prevState) => ({
        ...prevState,
        currentTitle: state.editorHtml,
        isOpen: false,
        isSave: false,
      }));

      getHTML?.(state.editorHtml || '');
    }
  }, [firebaseDescription, allComments, state.isSave, state.editorHtml]);

  const ReactQuillChange = (html: string) => {
    setState((prevState) => ({
      ...prevState,
      editorHtml: html,
    }));
  };

  // the comment changes
  const changeComment = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    const foundComment = comments.find((item) => item.id === id);

    const id = currentTarget?.dataset?.id || '';

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
  // add a new comment
  const addComment = () => {
    const editDate = formatDate(new Date());
    const newId = uuidv4();
    const newComment: CommentProps = {
      id: newId,
      title: '',
      createDate: editDate,
    };

    setComments((prevComments) => [...prevComments, newComment]);

    setState((prevState) => ({
      ...prevState,
      editorHtml: '',
      commentsInfo: {
        id: newId,
        index: comments.length,
        editDate: editDate,
      },
    }));
  };
  // save the edited comment
  const saveComments = () => {
    setState((prevState) => ({
      ...prevState,
      isSave: true,
    }));
    dispatch(isCardUpdate(true));
  };
  const cancelClick = () => {
    setState((prevState) => ({
      ...prevState,
      editorHtml: state.prevValue,
      isSave: true,
    }));
  };

  // edit text
  const editText = () => {
    if (!isLoggedIn) {
      return;
    }
    updateState({prevValue: state.editorHtml});
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  return (
    <div className='text-editor'>
      {state.isOpen ? (
        <div className='kkk'>
          <ReactQuill
            className='editor'
            theme='snow'
            onChange={ReactQuillChange}
            value={state.editorHtml}
            modules={modules}
            formats={formats}
            bounds={'#root'}
          />
          <div className='flex text-editor__row'>
            <button
              type='button'
              className='button-dark text-editor__button'
              onClick={saveComments}
            >
              Save
            </button>
            <button
              type='button'
              className='button-border text-editor__button'
              onClick={cancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='text-editor__desc' onClick={editText}>
          {!hasComments && state.editorHtml && (
            <>
              <div dangerouslySetInnerHTML={{__html: state.editorHtml}}></div>
            </>
          )}
          {!hasComments && !state.editorHtml && (
            <span>{state.currentTitle}</span>
          )}

          {hasComments && (
            <>
              <button
                className='d-block mt-5'
                onClick={addComment}
                disabled={!isLoggedIn}
              >
                добавить comment
              </button>
              {comments?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.editDate ? (
                      <span>{item.editDate}(изменнено)</span>
                    ) : (
                      <span>{item.createDate}</span>
                    )}
                    {!isLoggedIn ? (
                      <p
                        data-id={item.id}
                        dangerouslySetInnerHTML={{__html: item.title}}
                      ></p>
                    ) : (
                      <p
                        data-id={item.id}
                        onClick={changeComment}
                        dangerouslySetInnerHTML={{__html: item.title}}
                      ></p>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TextEditor;
