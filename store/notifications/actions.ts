export const NOTIFICATIONS = 'notifications/NOTIFICATIONS';
export const IS_NOTIFICATIONS_OPEN = 'notifications/IS_NOTIFICATIONS_OPEN';

export type NotificationsProp = {
  type: typeof NOTIFICATIONS;
  payload: any;
};

export type ActionsType = NotificationsProp | isNotificationsOpenProp;

export const getNotifications = (data: any) => {
  return {
    type: NOTIFICATIONS,
    payload: data,
  };
};

export type isNotificationsOpenProp = {
  type: typeof IS_NOTIFICATIONS_OPEN;
  payload: any;
};

export const isNotificationsOpen = (data: boolean) => {
  return {
    type: IS_NOTIFICATIONS_OPEN,
    payload: data,
  };
};
