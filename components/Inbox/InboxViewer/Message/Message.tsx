import {FC} from 'react';
import './Message.scss';
import Header from './Header/Header';

interface MessageProps {
  data: any;
}
const Message: FC<MessageProps> = ({data}) => {
  return (
    <div className='message'>
      <div className='message__container'>
        <Header senderId={data.senderId} senderInfo={data.senderInfo} recipientId={data.recipientId} time={data.time} />
        <div className='message__text'>
          <div className='message__subtitle'> {data.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.messageText,
            }}
          ></div>
          {}
        </div>
      </div>
    </div>
  );
};

export default Message;
