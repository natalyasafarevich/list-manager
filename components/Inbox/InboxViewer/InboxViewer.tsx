'use client';
import {FC, useEffect, useState} from 'react';
import './InboxViewer.scss';
import {MessageProps} from '@/providers/MessageStatusTracking';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import ArchiveMessage from '../InboxOptions/ArchiveMessage/ArchiveMessage';
import DeleteMessage from '../InboxOptions/DeleteMessage/DeleteMessage';
import StarredMessage from '../InboxOptions/StarredMessage/StarredMessage';
import SpamMessage from '../InboxOptions/SpamMessage/SpamMessage';

interface InboxViewerProps {
  messageId: string;
  isArchived: (v: boolean) => void;
}

const InboxViewer: FC<InboxViewerProps> = ({messageId, isArchived}) => {
  const [data, setData] = useState<any>({});
  console.log(data);
  const {mergedMessages} = useSelector((state: RootState) => state.inbox);

  useEffect(() => {
    messageId && setData(mergedMessages[messageId]);
  }, [messageId]);

  if (!mergedMessages[messageId]) {
    return;
  }
  return (
    <div className='inbox-viewer'>
      <div className='inbox-viewer__container'>
        <div className='inbox-viewer__header'>
          <div className='inbox-viewer__item'>
            <ArchiveMessage isArchived={(e) => isArchived(e)} id={messageId} type={mergedMessages[messageId]?.status} />
          </div>
          <div className='inbox-viewer__item'>
            <DeleteMessage isArchived={(e) => isArchived(e)} id={messageId} type={mergedMessages[messageId]?.status} />
          </div>
          <div className='inbox-viewer__item'>
            <StarredMessage isArchived={(e) => isArchived(e)} id={messageId} type={mergedMessages[messageId]?.status} />
          </div>
          <div className='inbox-viewer__item'>
            <SpamMessage isArchived={(e) => isArchived(e)} id={messageId} type={mergedMessages[messageId]?.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxViewer;
