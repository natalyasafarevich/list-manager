'use client';
import {AppDispatch, RootState} from '@/store/store';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './Notifications.scss';
import {useDispatch} from 'react-redux';
import {isNotificationsOpen} from '@/store/notifications/actions';
import NotificationItem from '../NotificationItem/NotificationItem';
import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';

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
  const hasUnviewedNotifications = notification.some((data) => !data.isViewed);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setNotification(note.notifications);
  }, [note.notifications]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(note.isOpen);
  }, [note.isOpen]);
  return (
    // <ClickAwayListener setIsOpen={(e) => setIsOpen(e)}>
    <div className={`notification ${isOpen ? 'open' : ''}`}>
      <div className='notification__container'>
        <p className='notification__title'>
          Notifications
          <button onClick={() => dispatch(isNotificationsOpen(false))} className='button-close'></button>
        </p>

        <div className='notification__box'>
          <div className='notification__content'>
            <p className='notification__subtitle'>New: </p>
            {hasUnviewedNotifications ? (
              <>
                {notification.map((data, i) => (
                  <div key={i}>{!data.isViewed && <NotificationItem data={data} isNew={true} />}</div>
                ))}
              </>
            ) : (
              <div className='notification__text-empty'>
                <span>You have no new notifications</span>
              </div>
            )}
          </div>
          <br />
          <p className='notification__subtitle'>Viewed: </p>
          {notification?.map((data, i) => <div key={i}>{data.isViewed && <NotificationItem data={data} />}</div>)}
        </div>
      </div>
    </div>
    // </ClickAwayListener>
  );
};

export default Notifications;
