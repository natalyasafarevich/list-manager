'use client';
import {RootState} from '@/store/store';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import './CommentsSection.scss';
import Comment from './Comment/Comment';

interface CommentsSectionProps {
  commentsData: Array<any>;
  onChangeComment: (e: React.MouseEvent<HTMLElement>) => void;
  isLoggedIn: boolean;
}
const CommentsSection: FC<CommentsSectionProps> = ({
  commentsData,
  onChangeComment,
  isLoggedIn,
}) => {
  const user = useSelector((state: RootState) => state.userdata);

  return (
    <div className='comments-section'>
      <div className='comments-section__container'>
        <div className='comments-section__items'>
          {commentsData.map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              isLoggedIn={isLoggedIn}
              user={user}
              changeComment={onChangeComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
