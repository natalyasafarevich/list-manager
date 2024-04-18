import {formats, modules} from '@/variables/edit';
import React, {FC} from 'react';
import ReactQuill from 'react-quill';

interface EditorContentProps {
  value: string;
  onChange: (html: string) => void;
}
const EditorContent: FC<EditorContentProps> = ({value, onChange}) => {
  return (
    <ReactQuill
      className='editor'
      theme='snow'
      onChange={onChange}
      value={value}
      modules={modules}
      formats={formats}
      bounds={'#root'}
    />
  );
};

export default EditorContent;
