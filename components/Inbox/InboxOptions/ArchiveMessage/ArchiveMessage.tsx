'use client';
import {FC, useEffect, useState} from 'react';
import './ArchiveMessage.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {MessageProps} from '@/providers/MessageStatusTracking';
import {updateUserData} from '@/helper/updateUserData';

interface ArchiveMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}

const ArchiveMessage: FC<ArchiveMessageProps> = ({id, type, isArchived}) => {
  const [archivedMessages, setArchivedMessages] = useState<MessageProps>({});
  const [updatedInbox, setUpdatedInbox] = useState<MessageProps>({});
  const [isUpdate, setIsUpdate] = useState(false);

  const {inbox} = useSelector((state: RootState) => state.inbox);
  const {uid} = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    setArchivedMessages(inbox.archivedMessage || {});
  }, [inbox.archivedMessage]);

  const archiveMessage = () => {
    const updatedMessages = type === 'delivered' ? {...inbox.receivedMessages} : {...inbox.sentMessages};
    const messageToArchive = updatedMessages[id];
    delete updatedMessages[id];

    setUpdatedInbox(updatedMessages);
    setArchivedMessages((prev) => ({...prev, [id]: messageToArchive}));
    setIsUpdate(true);
  };

  useEffect(() => {
    if (isUpdate && uid) {
      isArchived(false);
      const updateData = type === 'delivered' ? {receivedMessages: updatedInbox} : {sentMessages: updatedInbox};
      updateUserData(`/${uid}/messages`, {...updateData, archivedMessage: archivedMessages})
        .then(() => {
          setIsUpdate(false);
          isArchived(true);
        })
        .catch(() => {
          isArchived(false);
          setIsUpdate(false);
        });
    }
  }, [isUpdate, uid, type, updatedInbox, archivedMessages]);

  return <button onClick={archiveMessage} title='Archived' className='archive-message tooltip'></button>;
};

export default ArchiveMessage;
