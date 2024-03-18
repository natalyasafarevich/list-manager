'use client';
import React, {FC, useEffect, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
interface CardDescriptionProps {
  getHTML: (html: string) => void;
}
const CardDescription: FC<CardDescriptionProps> = ({getHTML}) => {
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [editorHtml, setEditorHtml] = useState('');
  useEffect(() => {
    if (isSave) {
      getHTML(editorHtml);
      setIsOpen(false);
    }
  }, [isSave, editorHtml]);
  const handleChange = (html: string) => {
    setEditorHtml(html);
    // console.log(html);
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
        <ReactQuill
          theme='snow'
          onChange={handleChange}
          value={editorHtml}
          modules={modules}
          formats={formats}
          bounds={'#root'}
          // placeholder={placeholder}
        />
      ) : (
        <p className='text-primary' onClick={(e) => setIsOpen(!isOpen)}>
          введите описание
        </p>
      )}
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
      {/* <div
        className='btn-secondary__'
        dangerouslySetInnerHTML={{__html: editorHtml}}
      ></div> */}
    </>
  );
};

export default CardDescription;

// export default CardDescription;
