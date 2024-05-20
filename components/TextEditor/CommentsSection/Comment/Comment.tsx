import {getCommentOwner} from '@/store/comments/actions';
import {AppDispatch} from '@/store/store';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

interface CommentProps {
  comment: any;
  isLoggedIn: boolean;
  user: any;

  changeComment: (e: React.MouseEvent<HTMLElement>) => void;
}

const Comment: FC<CommentProps> = ({comment, isLoggedIn, user, changeComment}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleCommentClick = () => {
    if (isLoggedIn) {
      dispatch(getCommentOwner(comment.owner));
    } else {
      // Действие при клике на комментарий, если пользователь не аутентифицирован
      // Например, можно открыть окно аутентификации или показать предпросмотр комментария
    }
  };

  return (
    <div
      className='comments-section__box'
      onClick={() => {
        handleCommentClick();
      }}
    >
      {isLoggedIn ? (
        <div className='comments-section__flex flex'>
          <div
            className='comments-section__image'
            style={{
              background: `center/cover no-repeat url(${comment.photoUrl})`,
            }}
          ></div>
          <p className='comments-section__name'>{comment.name}</p>
        </div>
      ) : (
        <div>
          {/* <div
              className='comments-section__content'
              data-id={comment.id}
              dangerouslySetInnerHTML={{__html: comment.title}}
              aria-disabled
            ></div> */}
        </div>
      )}
      <div className='comments-section__info'>
        <div
          className='comments-section__content'
          data-id={comment.id}
          data-info={comment.owner === user.uid ? 'edit' : ''}
          onClick={changeComment}
          dangerouslySetInnerHTML={{__html: comment.title}}
        ></div>
        <span className='comments-section__date'>{comment.createDate}</span>
      </div>
    </div>
  );
};

export default Comment;
