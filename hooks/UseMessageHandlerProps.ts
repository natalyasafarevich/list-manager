import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {MessageProps} from '@/providers/MessageStatusTracking';
import {updateUserData} from '@/helper/updateUserData';

interface UseMessageHandlerProps {
  id: string;
  type: string;
  action: 'archive' | 'delete' | 'spam' | 'starred';
  onComplete: (v: boolean) => void;
}

const useMessageHandler = ({id, type, action, onComplete}: UseMessageHandlerProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedMessages, setUpdatedMessages] = useState<MessageProps>({});
  const [targetMessages, setTargetMessages] = useState<MessageProps>({});
  const {inbox} = useSelector((state: RootState) => state.inbox);
  const {uid} = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (action === 'archive') {
      setTargetMessages(inbox.archivedMessage || {});
    } else if (action === 'delete') {
      setTargetMessages(inbox.deletedMessage || {});
    } else if (action === 'spam') {
      setTargetMessages(inbox.spamMessage || {});
    } else if (action === 'starred') {
      setTargetMessages(inbox.starredMessage || {});
    }
  }, [inbox.archivedMessage, inbox.deletedMessage, inbox.spamMessage, inbox.starredMessage, action]);

  const handleAction = useCallback(() => {
    const messages = type === 'delivered' ? {...inbox.receivedMessages} : {...inbox.sentMessages};
    const messageToHandle = messages[id];
    delete messages[id];

    setUpdatedMessages(messages);

    if (action === 'archive') {
      setTargetMessages((prev) => ({...prev, [id]: messageToHandle}));
    } else if (action === 'delete') {
      setTargetMessages((prev) => ({...prev, [id]: messageToHandle}));
    } else if (action === 'spam') {
      setTargetMessages((prev) => ({...prev, [id]: messageToHandle}));
    } else if (action === 'starred') {
      setTargetMessages((prev) => ({...prev, [id]: messageToHandle}));
    }

    setIsUpdate(true);
  }, [id, type, inbox, action]);

  useEffect(() => {
    if (isUpdate && uid) {
      onComplete(false);
      const updateData = type === 'delivered' ? {receivedMessages: updatedMessages} : {sentMessages: updatedMessages};

      let data = {};

      if (action === 'archive') {
        data = {...updateData, archivedMessage: targetMessages};
      } else if (action === 'delete') {
        data = {...updateData, deletedMessage: targetMessages};
      } else if (action === 'spam') {
        data = {...updateData, spamMessage: targetMessages};
      } else if (action === 'starred') {
        data = {...updateData, starredMessage: targetMessages};
      }

      updateUserData(`/${uid}/messages`, data)
        .then(() => {
          setIsUpdate(false);
          onComplete(true);
        })
        .catch(() => {
          onComplete(false);
          setIsUpdate(false);
        });
    }
  }, [isUpdate, uid, type, updatedMessages, targetMessages, action, onComplete]);

  return {handleAction};
};

export default useMessageHandler;
