import {FC} from 'react';
import './SpamMessage.scss';
import useMessageHandler from '@/hooks/UseMessageHandlerProps';
interface StarredMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}
const SpamMessage: FC<StarredMessageProps> = ({id, type, isArchived}) => {
  const {handleAction} = useMessageHandler({id, type, action: 'spam', onComplete: isArchived});
  return <button onClick={handleAction} title='Move to Spam' className='spam-message tooltip'></button>;
};

export default SpamMessage;
