'use client';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './Notification.scss';

interface NotificationType {
  [key: string]: {
    id: string;
    isViewed: boolean;
    link: string;
    message: string;
    name: string;
  };
}

const Notification: FC = () => {
  const [notification, getNotification] = useState<NotificationType>({});

  return (
    <div className='notification'>
      <div className='notification__container'>
        <div className='notification__box'>
          {Object.keys(notification).map((key) => (
            <p key={notification[key].id} className='notification__text'>
              {notification[key].message}
              <Link href={`/board/${notification[key].link}`}>
                {notification[key].name}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
