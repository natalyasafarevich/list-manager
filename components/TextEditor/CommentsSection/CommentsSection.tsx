'use client';
import {RootState} from '@/store/store';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import './CommentsSection.scss';
import Image from 'next/image';

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
        <div className='comments-section__items'>
          {comments.map((comment, index) => (
            <div className='comments-section__box' key={index}>
              {!isLoggedIn ? (
                <div>
                  <div
                    className='comments-section__content'
                    data-id={comment.id}
                    dangerouslySetInnerHTML={{__html: comment.title}}
                  ></div>
                </div>
              ) : (
                <div className='comments-section__flex flex'>
                  <div
                    className='comments-section__image'
                    style={{
                      background: `center/cover no-repeat url(${comment.photoUrl})`,
                    }}
                  ></div>
                  <div className='comments-section__info'>
                    <p className='comments-section__name'>
                      {comment.name}
                      <span className='comments-section__date'>
                        ({comment.createDate})
                      </span>
                    </p>
                    <div
                      className='comments-section__content'
                      data-id={comment.id}
                      data-info={'edit'}
                      onClick={changeComment}
                      dangerouslySetInnerHTML={{__html: comment.title}}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
