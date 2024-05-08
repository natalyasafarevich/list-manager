import {FC} from 'react';
import {NotificationInfoType} from '../Notifications/Notifications';
import Link from 'next/link';

interface NotificationItemProps {
  data: NotificationInfoType;
  isNew?: boolean;
}

const NotificationItem: FC<NotificationItemProps> = ({data, isNew}) => {
  return (
    <div
      className={`notification__type notification__type-${data.type} ${isNew ? 'active' : ''} `}
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
  );
};

export default NotificationItem;
