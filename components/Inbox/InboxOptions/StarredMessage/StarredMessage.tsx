import {FC} from 'react';
import './StarredMessage.scss';
import useMessageHandler from '@/hooks/UseMessageHandlerProps';
interface StarredMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}
const StarredMessage: FC<StarredMessageProps> = ({id, type, isArchived}) => {
  const {handleAction} = useMessageHandler({id, type, action: 'archive', onComplete: isArchived});
  return <button onClick={handleAction} title='Move to stared' className='starred-message tooltip'></button>;
};

export default StarredMessage;
