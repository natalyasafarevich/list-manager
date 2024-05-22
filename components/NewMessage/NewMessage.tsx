'use client';
import {FC, useEffect, useState} from 'react';
import './NewMessage.scss';
import ReactQuill, {Quill} from 'react-quill';
import {updateUserData} from '@/helper/updateUserData';
import ImageResize from 'quill-image-resize-module-react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import 'react-quill/dist/quill.snow.css';
import {formats, modules} from '@/variables/edit';
import PopupMessage from '../PopupMessage/PopupMessage';
Quill.register('modules/imageResize', ImageResize);

interface NewMessageProps {
  setIsIOpen: (v: boolean) => void;
  recipientId?: string;
  recipientName?: string;
}

const NewMessage: FC<NewMessageProps> = ({recipientId, setIsIOpen, recipientName}) => {
  const [messageValue, setMessageValue] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [recipients, setRepresents] = useState<string>('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {uid, additional_info} = useSelector((state: RootState) => state.userdata);
  const {user_names} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    recipientId && setRepresents(recipientId);
    recipientName && setRepresents(recipientName);
  }, [recipientId, recipientName]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(user_names as any)[recipients]) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const id = createId();
    const currentTime = new Date();

    updateUserData(`${(user_names as any)[recipients]}/messages/receivedMessages`, {
      [id]: {
        read: false,
        senderId: uid,
        messageText: messageValue,
        status: 'delivered',
        title: subtitle,
        time: currentTime,
        recipientId: recipients,
        senderInfo: {
          name: additional_info.fullName,
          photo: additional_info.mainPhoto.url,
          publicName: additional_info.publicName,
        },
      },
    });
    updateUserData(`${uid}/messages/sentMessages`, {
      [id]: {
        read: false,
        senderId: uid,
        title: subtitle,
        messageText: messageValue,
        status: 'sent',
        recipientId: recipients,
        time: currentTime,
        senderInfo: {
          name: additional_info.fullName,
          photo: additional_info.mainPhoto.url,
          publicName: additional_info.publicName,
        },
      },
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsIOpen(false);
    }, 3000);
  };

  const onChange = (html: string) => {
    setMessageValue(html);
  };

  return (
    <>
      <div className='new-message'>
        {error && <PopupMessage title='Wrong the recipient`s name' messageType='error' />}
        {success && <PopupMessage title='The message was delivered' messageType='success' />}
        {!success && (
          <div className='new-message__container'>
            <div className='new-message__header'>
              <p className='new-message__title'>New Message</p>
              <button className='new-message__button' onClick={() => setIsIOpen(false)}></button>
            </div>
            <form className='new-message__form' onSubmit={handleSubmit}>
              <input
                className='new-message__input'
                placeholder='Recipients'
                value={recipients}
                required
                onChange={(e) => setRepresents(e.currentTarget.value)}
              />
              <input
                className='new-message__input'
                placeholder='Subject'
                value={subtitle}
                onChange={(e) => setSubtitle(e.currentTarget.value)}
              />
              <div className='new-message__box'>
                <ReactQuill
                  className='message-box'
                  theme='snow'
                  onChange={onChange}
                  value={messageValue}
                  modules={modules}
                  formats={formats}
                  bounds={'#root'}
                  placeholder='Write here your message  '
                />
              </div>
              <button className='new-message__button-submit '>Send</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default NewMessage;
