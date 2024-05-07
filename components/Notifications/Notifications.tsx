'use client';
import {AppDispatch, RootState} from '@/store/store';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './Notifications.scss';
import {useDispatch} from 'react-redux';
import {isNotificationsOpen} from '@/store/notifications/actions';

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

  const note = useSelector((state: RootState) => state.note);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setNotification(note.notifications);
  }, [note.notifications]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(note.isOpen);
  }, [note.isOpen]);
  return (
    <div className={`notification ${isOpen ? 'open' : ''}`}>
      <div className='notification__container'>
        <p className='notification__title'>
          Notifications
          <button
            onClick={() => dispatch(isNotificationsOpen(false))}
            className='button-close'
          ></button>
        </p>

        <div className='notification__box'>
          <div className='notification__content'>
            <p className='notification__subtitle'>New: </p>
            {notification.length > 0 ? (
              notification?.map((data) => (
                <div key={data.id}>
                  {!data.isViewed && (
                    <div
                      className={`notification__type notification__type-${data.type} active`}
                      key={data.id}
                    >
                      <div>
                        <p className={`notification__text`}>
                          {data.message}

                          <Link href={`/board/${data.link}`}>{data.name}</Link>
                        </p>
                        <div className='notification__info'>
                          by
                          <Link href={`/profile/${data.uid}`}>{data.by}</Link>
                          <span> {data.time}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <span>lfkhslhk</span>
            )}
          </div>
          <br />
          <p className='notification__subtitle'>Viewed: </p>
          {notification?.map((data) => (
            <div key={data.id}>
              {data.isViewed && (
                <div
                  className={`notification__type notification__type-${data.type}`}
                >
                  <div>
                    <p className={`notification__text`}>
                      {data.message}

                      <Link href={`/board/${data.link}`}>{data.name}</Link>
                    </p>
                    <div className='notification__info'>
                      by <Link href={`/profile/${data.uid}`}>{data.by}</Link>
                      <span> {data.time}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
