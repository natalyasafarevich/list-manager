'use client';
import {FC, useEffect, useState} from 'react';
import './Item.scss';
import {MessageProps} from '@/providers/MessageStatusTracking';

interface InboxListItemProps {
  message: any;
}
export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();

  // Проверка, является ли дата сегодняшней
  const isToday = date.toDateString() === now.toDateString();

  // Проверка, является ли дата текущим годом
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Если дата сегодняшняя, возвращаем только время без секунд
    return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
  } else {
    // Если дата не сегодняшняя, возвращаем дату с условием года
    const dateOptions: any = isCurrentYear
      ? {month: 'long', day: 'numeric'}
      : {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', dateOptions);
  }
}

const InboxListItem: FC<InboxListItemProps> = ({message}) => {
  const [item, setItem] = useState<any>({});
  useEffect(() => {
    setItem(message);
  }, [message]);
  const formattedDate = formatDate(message?.time);
  return (
    <div className=' inbox-list-item'>
      <div className='inbox-list-item__container'>
        <div
          className='inbox-list-item__avatar'
          style={{background: `center/cover no-repeat url(${item?.senderInfo?.photo})`}}
        ></div>
        <div className='inbox-list-item__info'>
          <p className='inbox-list-item__name'>
            {item?.senderInfo?.name}
            <span className='inbox-list-item__time  '>{formattedDate}</span>
          </p>
          <p className='inbox-list-item__subtitle'>
            {item?.title || ''}
            {item?.status === 'delivered' && !item?.read && <span className={`inbox-list-item__unread`}></span>}
          </p>
          <div
            className='inbox-list-item__desc'
            dangerouslySetInnerHTML={{
              __html: item?.messageText,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InboxListItem;
