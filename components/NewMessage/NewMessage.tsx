'use client';
import {FC, useState} from 'react';
import './NewMessage.scss';
import ReactQuill, {Quill} from 'react-quill';
import {updateUserData} from '@/helper/updateUserData';
import ImageResize from 'quill-image-resize-module-react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import 'react-quill/dist/quill.snow.css';
import {formats, modules} from '@/variables/edit';
Quill.register('modules/imageResize', ImageResize);

const NewMessage: FC = () => {
  const {uid, additional_info} = useSelector((state: RootState) => state.userdata);
  const [messageValue, setMessageValue] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [recipients, setRepresents] = useState('');
  // console.log(additional_info.fullName);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageValue && !recipients) {
      alert('Ввeдите текст');
      return;
    }
    const id = createId();
    var currentTime = new Date();

    // updateUserData(`${`recipientId`}/messages/receivedMessages`, {
    //   [id]: {
    //     read: false,
    //     senderId: uid,
    //     messageText: messageValue,
    //     status: 'delivered',
    //     title: subtitle,
    //     time: currentTime,
    //     senderInfo: {
    //       name: additional_info.fullName,
    //       photo: additional_info.mainPhoto.url,
    //       publicName: additional_info.publicName,
    //     },
    //   },
    // });
    // updateUserData(`${uid}/messages/sentMessages`, {
    //   [id]: {
    //     read: false,
    //     senderId: uid,
    //     title: subtitle,
    //     messageText: messageValue,
    //     status: 'sent',
    //     time: currentTime,
    //     senderInfo: {
    //       name: additional_info.fullName,
    //       photo: additional_info.mainPhoto.url,
    //       publicName: additional_info.publicName,
    //     },
    //   },
    // });
    // alert('Отправлено');
  };
  const onChange = (html: string) => {
    setMessageValue(html);
  };
  return (
    <div className='new-message'>
      <div className='new-message__container'>
        <div className='new-message__header'>
          <p className='new-message__title'>New Message</p>
          <button className='new-message__button'></button>
        </div>
        <form className='new-message__form' onSubmit={handleSubmit}>
          <input
            className='new-message__input'
            placeholder='Recipients'
            value={recipients}
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
    </div>
  );
};

export default NewMessage;
