// EditorToolbar.js
import React, {FC} from 'react';
interface EditorToolbarProps {
  onSave: () => void;
  onCancel: () => void;
}
const EditorToolbar: FC<EditorToolbarProps> = ({onSave, onCancel}) => {
  return (
    <div className='flex text-editor__row'>
      <button
        type='button'
        className='button-dark text-editor__button'
        onClick={onSave}
      >
        Save
      </button>
      <button
        type='button'
        className='button-border text-editor__button'
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditorToolbar;
