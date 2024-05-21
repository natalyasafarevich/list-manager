'use client';
import {FC, useEffect, useState} from 'react';
import './InboxList.scss';
import {MessagesProps} from '@/providers/MessageStatusTracking';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const InboxList: FC = () => {
  const [messages, setMessages] = useState<MessagesProps | null>(null);
  const {inbox} = useSelector((state: RootState) => state.inbox);
  useEffect(() => {
    setMessages(inbox);
  }, [inbox]);

  return <div></div>;
};

export default InboxList;
