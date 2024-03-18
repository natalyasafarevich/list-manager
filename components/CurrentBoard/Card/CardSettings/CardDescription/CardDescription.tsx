import React, {useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

const CardDescription = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html: any) => {
    setEditorHtml(html);
    console.log(html);
  };

  const modules = {
    toolbar: [
      [{header: '1'}, {header: '2'}, {font: []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      ['link', 'image', 'video'],
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
    'video',
  ];

  return (
    <ReactQuill
      theme='snow'
      onChange={handleChange}
      value={editorHtml}
      modules={modules}
      formats={formats}
      bounds={'#root'}
      // placeholder={placeholder}
    />
  );
};

export default CardDescription;

// export default CardDescription;
