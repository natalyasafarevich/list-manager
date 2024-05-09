import {FC} from 'react';
import './PopupMessage.scss';

export interface PopupMessageProps {
  title: string;
  messageType: string;
  message?: string;
}

const PopupMessage: FC<PopupMessageProps> = ({title, messageType, message}) => {
  return (
    <div className='popup-message'>
      <div className={` popup-message__box popup-message__box-${messageType}`}>
        <p className={`popup-message__title icon icon-${messageType} `}>
          {title}
          <span>{message}</span>
        </p>
      </div>
    </div>
  );
};

export default PopupMessage;
