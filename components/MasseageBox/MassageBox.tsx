'use client';
import {updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {v4 as createId} from 'uuid';

interface MassageBoxProps {
  recipientId: string;
}

const MassageBox: FC<MassageBoxProps> = ({recipientId}) => {
  const {uid, additional_info} = useSelector((state: RootState) => state.userdata);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  console.log(additional_info.fullName);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      alert('Ввeдите текст');
      return;
    }
    const id = createId();
    var currentTime = new Date();

    updateUserData(`${recipientId}/messages/receivedMessages`, {
      [id]: {
        read: false,
        senderId: uid,
        messageText: value,
        status: 'delivered',
        title: title,
        time: currentTime,
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
        title: title,
        messageText: value,
        status: 'sent',
        time: currentTime,
        senderInfo: {
          name: additional_info.fullName,
          photo: additional_info.mainPhoto.url,
          publicName: additional_info.publicName,
        },
      },
    });
    alert('Отправлено');
  };
  return (
    <form className='message-box' onSubmit={handleSubmit}>
      <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <textarea
        className='message-box__input'
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      ></textarea>
      <button className='button-dark'>send</button>
    </form>
  );
};
export default MassageBox;
