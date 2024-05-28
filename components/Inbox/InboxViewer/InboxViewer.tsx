'use client';
import {FC, useEffect, useState} from 'react';
import './InboxViewer.scss';

import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import ArchiveMessage from '../InboxOptions/ArchiveMessage/ArchiveMessage';
import DeleteMessage from '../InboxOptions/DeleteMessage/DeleteMessage';
import StarredMessage from '../InboxOptions/StarredMessage/StarredMessage';
import SpamMessage from '../InboxOptions/SpamMessage/SpamMessage';
import Message from './Message/Message';
import useResponsive from '@/hooks/useResponsive';
import Link from 'next/link';

interface InboxViewerProps {
  messageId: string;
  isArchived: (v: boolean) => void;
  isOpen?: (v: boolean) => void;
}

const InboxViewer: FC<InboxViewerProps> = ({messageId, isArchived, isOpen}) => {
  const [data, setData] = useState<any>({});

  const {mergedMessages} = useSelector((state: RootState) => state.inbox);

  useEffect(() => {
    messageId && setData(mergedMessages[messageId]);
  }, [messageId]);

  if (!mergedMessages[messageId]) {
    return;
  }
  const {isMobile} = useResponsive();

  return (
    <div className='inbox-viewer'>
      <div className='inbox-viewer__container'>
        <div className='inbox-viewer__header'>
          {' '}
          <div className='inbox-viewer__content'>
            {isMobile && <button onClick={() => (isOpen ? isOpen(false) : {})} className='button-back'></button>}{' '}
          </div>
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
        <div className='inbox-viewer__info'>
          <Message data={data} />
        </div>
      </div>
    </div>
  );
};

export default InboxViewer;
