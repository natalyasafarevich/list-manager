// CardComments.tsx
import React, {FC, useState} from 'react';
import TextEditor from '@/components/TextEditor/TextEditor';
import {v4 as uuidv4} from 'uuid';

interface Comment {
  title: string;
  id: string;
}

interface CardCommentsProps {
  setComment: (comments: any) => void;
}

const CardComments: FC<CardCommentsProps> = ({setComment}) => {
  const [comment, setCommentValue] = useState<string>('');

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment: Comment = {title: comment, id: uuidv4()};
      setComment((prevComments: any) => [...prevComments, newComment]);
      setCommentValue('');
    }
  };

  return (
    <div className='card-comments'>
      <span className='d-block mt-5'>Добавить комментарий</span>
      <TextEditor
        isArray={true}
        getHTML={(e) => setCommentValue(e)}
        title={'Комментарий'}
      />
      <button
        type='button'
        className='btn btn-secondary'
        onClick={handleAddComment}
      >
        Добавить
      </button>
    </div>
  );
};

export default CardComments;
