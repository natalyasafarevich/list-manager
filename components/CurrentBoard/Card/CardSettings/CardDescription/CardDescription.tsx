'use client';
import React, {FC, useEffect, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

interface CardDescriptionProps {
  getHTML: (value: string) => void;
  backDescription: string;
}
const CardDescription: FC<CardDescriptionProps> = ({
  getHTML,
  backDescription,
}) => {
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState(' введите описание');
  const [editorHtml, setEditorHtml] = useState('');

  useEffect(() => {
    if (backDescription !== undefined) {
      setEditorHtml(backDescription);
    }
  }, [backDescription]);
  useEffect(() => {
    if (isSave) {
      setIsOpen(false);
      getHTML(editorHtml);
      setDesc(editorHtml);
      setIsSave(false);
    }
  }, [isSave, editorHtml]);
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  const modules = {
    toolbar: [
      [{header: '1'}, {header: '2'}, {font: []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

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
            <button type='button' className='btn btn-secondary'>
              отменить
            </button>
          </div>
        </>
      ) : (
        <div
          className='text-primary'
          onClick={(e) => setIsOpen(!isOpen)}
          // dangerouslySetInnerHTML={{__html: editorHtml}}
        >
          {editorHtml ? (
            <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
          ) : (
            <span>{desc}</span>
          )}
        </div>
      )}

      {/* <div
        className='btn-secondary__'
        dangerouslySetInnerHTML={{__html: editorHtml}}
      ></div> */}
    </>
  );
};

export default CardDescription;

// export default CardDescription;
