import {NotificationType} from '@/components/Notifications/Notifications';
import moment from 'moment';

export const formattedDate = (lang: string) => {
  let now = moment();
  moment.locale(lang);
  return now.format('lll');
};
