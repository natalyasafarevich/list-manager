import {FC} from 'react';
import './ArchiveMessage.scss';

import useMessageHandler from '@/hooks/UseMessageHandlerProps';

interface ArchiveMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}

const ArchiveMessage: FC<ArchiveMessageProps> = ({id, type, isArchived}) => {
  const {handleAction} = useMessageHandler({id, type, action: 'archive', onComplete: isArchived});
  return <button onClick={handleAction} title='Move to Archive' className='archive-message tooltip'></button>;
};

export default ArchiveMessage;
