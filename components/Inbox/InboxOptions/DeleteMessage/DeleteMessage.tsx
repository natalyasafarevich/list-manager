import {FC} from 'react';
import './DeleteMessage.scss';
import useMessageHandler from '@/hooks/UseMessageHandlerProps';

interface DeleteMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}
const DeleteMessage: FC<DeleteMessageProps> = ({id, type, isArchived}) => {
  const {handleAction} = useMessageHandler({id, type, action: 'archive', onComplete: isArchived});
  return <button onClick={handleAction} title='Move to Deleted' className='delete-message tooltip'></button>;
};

export default DeleteMessage;
