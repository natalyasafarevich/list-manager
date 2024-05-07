'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './Notifications.scss';
import {updateUserData} from '@/helper/updateUserData';

export interface NotificationType {
  [key: string]: NotificationInfoType;
}
export interface NotificationInfoType {
  id: string;
  isViewed: boolean;
  link: string;
  message: string;
  name: string;
  type: string;
  uid: string;
  by: string;
  time: string;
}
const Notifications: FC = () => {
  const [notification, setNotification] = useState<NotificationInfoType[]>([]);

  const note = useSelector((state: RootState) => state.note.notifications);

  useEffect(() => {
    setNotification(note);
  }, [note]);

  return (
    <div className='notification'>
      <div className='notification__container'>
        <p className='notification__title'>Notifications</p>

        <div className='notification__box'>
          {notification?.map((data) => (
            <p
              key={data.id}
              className={`notification__text notification__type-${data.type}`}
            >
              {data.message}
              <Link href={`/board/${data.link}`}>{data.name}</Link>
              by <Link href={`/profile/${data.uid}`}>{data.by}</Link>
              {data.time}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
