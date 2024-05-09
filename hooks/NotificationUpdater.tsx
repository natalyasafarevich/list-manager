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
  useEffect(() => {
    if (isAddNotification) {
      updateUserData(`${userUid}/notification`, notification);
    }
  }, [isAddNotification]);

  return null;
};

export default NotificationUpdater;
