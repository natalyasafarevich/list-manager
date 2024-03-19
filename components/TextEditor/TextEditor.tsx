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
import {getComments} from '@/store/card-setting/actions';

Quill.register('modules/imageResize', ImageResize);

interface TextEditorProps {
  title: string;
  getHTML: (value: string) => void;
  backDescription?: string;
  isArray: boolean;
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
  });

  const allComments = useSelector(
    (state: RootState) => state.card_setting.comments,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (allComments.length !== 0) {
      setComments(allComments);
      console.log(allComments, 'gf');
    }
  }, [allComments]);

  useEffect(() => {
    if (backDescription !== undefined) {
      setEditorHtml(backDescription);
    }
  }, [backDescription]);
  useEffect(() => {
    if (isSave) {
      const commentToUpdate = comments.find(
        (item) => item.id === commentsInfo.id,
      );
      if (commentToUpdate) {
        const updatedComment = {...commentToUpdate, title: editorHtml};

        const updatedComments = comments.map((item) =>
          item.id === commentsInfo.id ? updatedComment : item,
        );

        dispatch(getComments(updatedComments));
        setIsOpen(false);
        getHTML('');
        setCurrentTitle(editorHtml);

        setIsSave(false);
      } else {
        setIsOpen(false);
        getHTML(editorHtml);
        setCurrentTitle(editorHtml);

        setIsSave(false);
      }
    }
  }, [isSave, editorHtml]);

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

    const newId = uuidv4();
    const newComment: CommentProps = {
      id: newId,
      title: '',
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentsInfo({id: newId, index: comments.length});
  };

  return (
    <>
      {isOpen ? (
        <>
          <ReactQuill
            theme='snow'
            onChange={handleChange}
            value={editorHtml}
            modules={modules}
            formats={formats}
            bounds={'#root'}
          />
          <div className='d-flex'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={(e) => setIsSave(true)}
            >
              сохранить
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={(e) => {
                setIsSave(true);
                // setEditorHtml('');
              }}
            >
              отменить
            </button>
          </div>
        </>
      ) : (
        <div className='text-primary' onClick={(e) => setIsOpen(!isOpen)}>
          {!isArray && editorHtml && (
            <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
          )}
          {!isArray && !editorHtml && <span>{currentTitle}</span>}

          {isArray && (
            <>
              <button className='d-block mt-5' onClick={addComment}>
                добавить comment
              </button>
              {comments?.map((item, key) => {
                return (
                  <p
                    data-id={item.id}
                    key={key}
                    onClick={changeComment}
                    dangerouslySetInnerHTML={{__html: item.title}}
                  ></p>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TextEditor;
