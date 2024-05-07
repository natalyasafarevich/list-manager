'use client';
import {fetchBackData} from '@/helper/getFirebaseData';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {NotificationType} from '../Notifications/Notifications';
import {useDispatch} from 'react-redux';
import {getNotifications} from '@/store/notifications/actions';
import {updateUserData} from '@/helper/updateUserData';

const NotificationButton: FC = () => {
  const [notifications, setNotifications] = useState<NotificationType>({});
  const [sortedNotification, setSortedNotification] = useState<any>([]);
  const [isViewed, setIsViewed] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);

  const dispatch: AppDispatch = useDispatch();
  const [unread, setUnread] = useState<any>();

  useEffect(() => {
    if (notifications !== null) {
      const dataArray = Object.values(notifications);
      dataArray.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      );
      setSortedNotification(dataArray);
      dispatch(getNotifications(dataArray as []));
    }
    sortedNotification.forEach((item: any) => {
      if (!item.isViewed) {
        setUnread((prevUnread: any) => ({
          ...prevUnread,
          [item.id]: item,
        }));
      }
    });
  }, [notifications]);

  useEffect(() => {
    if (isViewed) {
      for (let key in unread) {
        updateUserData(`${user.uid}/notification/${key}`, {isViewed: true});
        setIsViewed(false);
      }
    }
  }, [isViewed]);

  useEffect(() => {
    user.uid && fetchBackData(user.uid, '/notification', setNotifications);
  }, [user]);
  return (
    <button
      onClick={() => {
        setIsViewed(true);
      }}
      className='dashboard-header__button dashboard-header__button_notification'
    ></button>
  );
};

export default NotificationButton;
