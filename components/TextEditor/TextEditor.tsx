'use client';
import {formats, modules} from '@/variables/edit';
import {FC, useEffect, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import {v4 as uuidv4} from 'uuid';
import 'react-quill/dist/quill.snow.css';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {CommentProps} from '../CurrentBoard/Card/CardSettings/CardSettings';
import {getListIndex} from '../CurrentBoard/Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {
  getComments,
  isCardUpdate,
  isDescriptionAdded,
} from '@/store/card-setting/actions';
import './TextEditor.scss';

Quill.register('modules/imageResize', ImageResize);

interface TextEditorProps {
  title: string;
  getHTML?: (value: string) => void;
  backDescription?: string;
  isArray?: boolean;
}

const TextEditor: FC<TextEditorProps> = ({
  title,
  getHTML,
  backDescription,
  isArray,
}) => {
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editorHtml, setEditorHtml] = useState('');
  const [comments, setComments] = useState<Array<CommentProps>>([]);
  const [commentsInfo, setCommentsInfo] = useState({
    id: '',
    index: 0,
    editDate: '',
  });

  const allComments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (allComments) {
      setComments(allComments);
    }
  }, [allComments]);

  useEffect(() => {
    if (backDescription !== undefined) {
      setEditorHtml(backDescription);
    }
  }, [backDescription]);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear() % 100;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const editDate = `${hours}:${minutes} ${month}/${day}/${year}`;
    if (isSave) {
      if (!isArray && editorHtml) {
        dispatch(isCardUpdate(true));

        // dispatch(isDescriptionAdded(true));
      }
      const commentToUpdate = comments.find(
        (item) => item.id === commentsInfo.id,
      );
      if (commentToUpdate) {
        const updatedComment = {
          ...commentToUpdate,
          title: editorHtml,
          editDate,
        };

        const updatedComments = comments.map((item) =>
          item.id === commentsInfo.id ? updatedComment : item,
        );

        dispatch(getComments(updatedComments));
        setIsOpen(false);
        getHTML && getHTML('');
        setCurrentTitle(editorHtml);

        setIsSave(false);
      } else {
        setIsOpen(false);
        getHTML && getHTML(editorHtml);
        setCurrentTitle(editorHtml);
        setIsSave(false);
      }
    }
  }, [isSave, editorHtml]);
  const [prevValue, setPrevValue] = useState('');
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  const changeComment = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    const id = currentTarget?.dataset?.id || '';
    const commentIndex = getListIndex(comments, id);
    setCommentsInfo((prev) => ({
      ...prev,
      id: id,
      index: commentIndex as number,
    }));
    const foundComment = comments.find((item) => item.id === id);
    if (foundComment) {
      setEditorHtml(foundComment.title);
    }
  };

  const addComment = () => {
    setEditorHtml('');
    const date = new Date();
    const year = date.getFullYear() % 100;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const newId = uuidv4();
    const newComment: CommentProps = {
      id: newId,
      title: '',
      createDate: `${hours}:${minutes} ${month}/${day}/${year}`,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentsInfo({
      id: newId,
      index: comments.length,
      editDate: `${hours}:${minutes} ${month}/${day}/${year}`,
    });
  };
  const user_status = useSelector((state: RootState) => state.userdata);
  const isLoggedIn = !!user_status.uid && user_status.user_status !== 'guest';
  const saveComments = () => {
    setIsSave(true);
    dispatch(isCardUpdate(true));
  };

  const cancelClick = () => {
    setEditorHtml(prevValue);
    setIsSave(true);
  };
  const editText = () => {
    if (!isLoggedIn) {
      return;
    }
    setPrevValue(editorHtml);

    setIsOpen(!isOpen);
  };

  return (
    <div className='text-editor'>
      {isOpen ? (
        <div className='kkk'>
          <ReactQuill
            className='editor'
            theme='snow'
            onChange={handleChange}
            value={editorHtml}
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
          {!isArray && editorHtml && (
            <>
              <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
            </>
          )}
          {!isArray && !editorHtml && <span>{currentTitle}</span>}

          {isArray && (
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
