'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Notification: FC = () => {
  const [notification, getNotification] = useState<any>();
  const [isOpen, getIsOpen] = useState(false);

  // console.log(notification);
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    user.uid &&
      fetchBackDefaultData(`users/${user.uid}/notification`, getNotification);
  }, [user]);
  return (
    <div>
      <button onClick={(e) => getIsOpen(!isOpen)}>open</button>
      {notification &&
        notification?.map(
          (note: any, i: any) =>
            isOpen && (
              <p>
                {note.message}{' '}
                <Link
                  href={`/board/${note.link}`}
                  onClick={(e) => getIsOpen(!isOpen)}
                >
                  {' '}
                  {note.name}
                </Link>
              </p>
            ),
        )}
    </div>
  );
};

export default Notification;
