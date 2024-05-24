'use client';
import {FC, useEffect, useState} from 'react';
import {updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import PopupMessage from '../PopupMessage/PopupMessage';
import 'react-quill/dist/quill.snow.css';
import './NewMessage.scss';
import dynamic from 'next/dynamic';

const modules = {
  toolbar: [
    [{header: '1'}, {header: '2'}, {font: []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];
interface NewMessageProps {
  setIsIOpen: (v: boolean) => void;
  recipientId?: string;
  recipientName?: string;
}
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
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

    if (!(user_names as any)[recipients.replace('@', '')]) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const id = createId();
    const currentTime = new Date();

    updateUserData(`${(user_names as any)[recipients.replace('@', '')]}/messages/receivedMessages`, {
      [id]: {
        read: false,
        senderId: uid,
        messageText: messageValue,
        status: 'delivered',
        title: subtitle,
        time: currentTime,
        recipientId: recipients.replace('@', ''),
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
        recipientId: recipients.replace('@', ''),
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
