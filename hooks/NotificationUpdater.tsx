import React, {useEffect, useState} from 'react';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';

interface NotificationUpdaterProps {
  userUid: string;
  notification: any;
  isAddNotification: boolean;
}

const NotificationUpdater: React.FC<NotificationUpdaterProps> = ({
  userUid,
  notification,
  isAddNotification,
}) => {
  const [notifications, setNotifications] = React.useState<any>({});
  // сo
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(Object.keys(notification).length > 0 && isAddNotification);
  useEffect(() => {
    if (Object.keys(notification).length > 0 && isAddNotification) {
      // setNotifications((prevNotifications: any) => ({
      //   ...prevNotifications,
      console.log(notification, 'notificationnotificationnotification');
      // }));
      setIsUpdate(true);
    }
  }, [notification, isAddNotification]);
  console.log(notifications);
  useEffect(() => {
    if (userUid) {
      fetchBackDefaultData(`users/${userUid}/notification`, setNotifications);
    }
  }, [userUid]);

  useEffect(() => {
    if (isAddNotification) {
      updateUserData(`${userUid}/notification`, notification);
      setIsUpdate(false);
    }
  }, [isAddNotification]);

  return null;
};

export default NotificationUpdater;
