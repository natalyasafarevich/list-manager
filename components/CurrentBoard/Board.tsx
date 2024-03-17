'use client';
import {RootState} from '@/store/store';
import {useUrl} from 'nextjs-current-url';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ColumnCreator from './Column/ColumnCreator/ColumnCreator';
import ArchivedСolumns from './ArchivedСolumns/ArchivedСolumns';

export type PayloadProps = {
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
  lists?: Array<any>;
};
const initialBoard = {
  name: '',
  currentBg: '',
  visibility: '',
  id: '',
};

const CurrentBoard: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<PayloadProps>(initialBoard);
  const [currentPathname, setCurrentPathname] = useState<string>('');
  const [index, setIndex] = useState<any>(0);

  const {pathname} = useUrl() ?? {};
  const board = useSelector((state: RootState) => state.boards.boards);

  useEffect(() => {
    const parts = pathname ? pathname.split('/') : [];
    const lastPart = parts.length > 0 ? parts[parts.length - 1] : '';
    setCurrentPathname(lastPart);
  }, [pathname]);

  useEffect(() => {
    if (currentPathname && board)
      board?.map((item: any, i: any) => {
        if (!item?.id?.includes(currentPathname)) {
          return;
        }

        setIndex(i);
        setCurrentBoard(item);
      });
  }, [board, currentPathname]);

  return (
    <div className='mt-5 '>
      <h1 className='text-center'>{currentBoard.name}</h1>
      <div className='d-flex justify-content-between'>
        <div className=''>
          <ColumnCreator currentIndex={index} />
        </div>
        <ArchivedСolumns />
        {/* <ArchiveColumn /> */}
      </div>
    </div>
  );
};

export default CurrentBoard;
