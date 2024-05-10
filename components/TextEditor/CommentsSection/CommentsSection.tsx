'use client';
import {AppDispatch, RootState} from '@/store/store';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getCommentOwner} from '@/store/comments/actions';
import './CommentsSection.scss';
import Comment from './Comment/Comment';

interface CommentsSectionProps {
  comments: Array<any>;
  changeComment: (e: React.MouseEvent<HTMLElement>) => void;
  isLoggedIn: boolean;
}
const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  changeComment,
  isLoggedIn,
}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className='comments-section'>
      <div className='comments-section__container'>
        <div className='comments-section__items'>
          {comments.map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              isLoggedIn={isLoggedIn}
              user={user}
              changeComment={changeComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
