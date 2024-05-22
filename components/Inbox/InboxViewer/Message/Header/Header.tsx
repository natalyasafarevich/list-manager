import {FC} from 'react';
import './Header.scss';
import {formatDate} from '@/components/Inbox/InboxList/Item/Item';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';

interface HeaderProps {
  senderInfo: any;
  time: string;
  senderId: string;
  recipientId: string;
}

const Header: FC<HeaderProps> = ({senderInfo, time, senderId, recipientId}) => {
  const {additional_info, uid} = useSelector((state: RootState) => state.userdata);
  const date = formatDate(time);
  return (
    <div className='header-message'>
      <div className='header-message__container'>
        <div
          className='header-message__img'
          style={{background: `center/cover no-repeat url(${senderInfo?.photo})`}}
        ></div>
        <div className='header-message__info'>
          <div className='header-message__name flex'>
            {senderInfo?.name} <span>{date}</span>
          </div>
          <div className='header-message__text'>
            to : <Link href={`/profile/${uid}`}>@{recipientId}</Link> cc :{' '}
            <Link href={`/profile/${senderId}`}>@{senderInfo?.publicName}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
