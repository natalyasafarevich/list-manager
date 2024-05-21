'use client';
import {FC, useEffect, useState} from 'react';
import './ArchiveMessage.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {MessageProps} from '@/providers/MessageStatusTracking';
import {updateUserData} from '@/helper/updateUserData';
import useMessageHandler from '@/hooks/UseMessageHandlerProps';

interface ArchiveMessageProps {
  id: string;
  type: string;
  isArchived: (v: boolean) => void;
}

const ArchiveMessage: FC<ArchiveMessageProps> = ({id, type, isArchived}) => {
  const {handleAction} = useMessageHandler({id, type, action: 'starred', onComplete: isArchived});
  return <button onClick={handleAction} title='Archived' className='archive-message tooltip'></button>;
};

export default ArchiveMessage;
