'use client';
import {FC, useEffect, useState} from 'react';
import './InboxViewer.scss';
import {MessageProps} from '@/providers/MessageStatusTracking';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

interface InboxViewerProps {
  messageId: string;
}

const InboxViewer: FC<InboxViewerProps> = ({messageId}) => {
  const [data, setData] = useState<any>({});
  const {mergedMessages} = useSelector((state: RootState) => state.inbox);

  useEffect(() => {
    setData(mergedMessages[messageId]);
  }, [messageId]);
  console.log(data);
  return (
    <div className='inbox-viewer'>
      <div className='inbox-viewer__container'>
        <div className='inbox-viewer__header'></div>
      </div>
    </div>
  );
};

export default InboxViewer;
