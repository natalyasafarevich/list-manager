export const NOTIFICATIONS = 'notifications/NOTIFICATIONS';

export type NotificationsProp = {
  type: typeof NOTIFICATIONS;
  payload: any;
};

export type ActionsType = NotificationsProp;

export const getNotifications = (data: any) => {
  return {
    type: NOTIFICATIONS,
    payload: data,
  };
};
