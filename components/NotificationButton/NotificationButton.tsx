'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {NotificationType} from '../Notifications/Notifications';
import {useDispatch} from 'react-redux';
import {getNotifications, isNotificationsOpen} from '@/store/notifications/actions';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import './NotificationButton.scss';
import {AnimatePresence, motion} from 'framer-motion';
import useResponsive from '@/hooks/useResponsive';

const NotificationButton: FC = () => {
  const {isMobile} = useResponsive();
  const [notifications, setNotifications] = useState<NotificationType>({});
  const [sortedNotification, setSortedNotification] = useState<any>([]);
  const [isViewed, setIsViewed] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);

  const dispatch: AppDispatch = useDispatch();
  const [unread, setUnread] = useState<any>();

  useEffect(() => {
    if (notifications !== null) {
      const dataArray = Object.values(notifications);
      dataArray.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
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
    if (unread) {
      setCounter(Object.keys(unread).length);
    }
    if (isViewed) {
    }
    if (isViewed && unread) {
      for (let key in unread) {
        updateFirebaseData(`users/${user.uid}/notification/${key}`, {
          isViewed: true,
        });
        setCounter(null);
      }
    }
  }, [isViewed, unread]);
  const [counter, setCounter] = useState<null | number>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    user.uid && fetchBackDefaultData(`users/${user.uid}/notification`, setNotifications);
  }, [user]);

  return (
    <AnimatePresence>
      <div className='button-note'>
        <motion.button
          onClick={() => {
            setIsViewed(true);
            dispatch(isNotificationsOpen(true));
          }}
          data-note={counter}
          className={`notification-button ${counter ? 'active' : ''}`}
        ></motion.button>
        {isMobile && <span>Notification</span>}
      </div>
    </AnimatePresence>
  );
};

export default NotificationButton;
