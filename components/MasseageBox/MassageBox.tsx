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
  const {uid} = useSelector((state: RootState) => state.userdata);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(recipientId);
    if (!value) {
      alert('Ввeдите текст');
      return;
    }
    const id = createId();
    var currentTime = new Date();

    updateUserData(`${recipientId}/messages/receivedMessages`, {
      [id]: {read: false, senderId: uid, messageText: value, status: 'delivered', time: currentTime},
    });
    updateUserData(`${uid}/messages/sentMessages`, {
      [id]: {read: false, senderId: uid, messageText: value, status: 'sent', time: currentTime},
    });
    alert('Отправлено');
  };
  return (
    <form className='message-box' onSubmit={handleSubmit}>
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
