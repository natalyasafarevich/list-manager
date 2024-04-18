'use client';
import {RootState} from '@/store/store';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import './CommentsSection.scss';

interface CommentsSectionProps {
  comments: Array<any>;
  changeComment: (e: React.MouseEvent<HTMLElement>) => void;
  isLoggedIn: boolean;
  addComment: () => void;
  isOpen: boolean;
}
const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  changeComment,
  isLoggedIn,
  addComment,
  isOpen,
}) => {
  const user = useSelector((state: RootState) => state.userdata);
  return (
    <div className='comments-section'>
      <div className='comments-section__container'>
        {isLoggedIn && !isOpen && (
          <div className='comments-section__row flex'>
            <div
              className='comments-section__image'
              style={{
                background: `center/cover no-repeat url(${user.photoURL})`,
              }}
            ></div>
            <p className='comments-section__button' onClick={addComment}>
              Write a comment
            </p>
          </div>
        )}
        {comments.map((comment, index) => (
          <div className='comments-section__box' key={index}>
            <span className=''>{comment.createDate}</span>
            {!isLoggedIn ? (
              <p
                data-id={comment.id}
                dangerouslySetInnerHTML={{__html: comment.title}}
              ></p>
            ) : (
              <p
                data-id={comment.id}
                onClick={changeComment}
                dangerouslySetInnerHTML={{__html: comment.title}}
              ></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
