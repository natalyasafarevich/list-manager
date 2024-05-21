import {updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import ImageResize from 'quill-image-resize-module-react';
import {formats, modules} from '@/variables/edit';
import {FC, useState} from 'react';
import {Quill} from 'react-quill';
import ReactQuill from 'react-quill';
import {useSelector} from 'react-redux';
import {v4 as createId} from 'uuid';
import 'react-quill/dist/quill.snow.css';
Quill.register('modules/imageResize', ImageResize);
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

  const onChange = (html: string) => {
    setValue(html);
  };
  return (
    <form className='message-box' onSubmit={handleSubmit}>
      <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      {/* <textarea
        className='message-box__input'
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      ></textarea> */}
      <ReactQuill
        className='editor'
        theme='snow'
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        bounds={'#root'}
      />
      <button className='button-dark'>send</button>
    </form>
  );
};
export default MassageBox;
