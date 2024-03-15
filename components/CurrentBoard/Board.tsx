'use client';
import {RootState} from '@/store/store';
import {useUrl} from 'nextjs-current-url';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import NewColumn from './NewColumn/NewColumn';

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
  const [index, setIndex] = useState<any>(null);

  const {pathname} = useUrl() ?? {};
  const board = useSelector((state: RootState) => state.boards.boards);
  // console.log(currentBoard.lists, 'board');

  useEffect(() => {
    const parts = pathname ? pathname.split('/') : [];
    const lastPart = parts.length > 0 ? parts[parts.length - 1] : '';
    setCurrentPathname(lastPart);
  }, [pathname]);
  console.log(board);
  useEffect(() => {
    if (currentPathname && board)
      board?.map((item: any, i: any) => {
        if (!item.id.includes(currentPathname)) {
          return;
        }

        setIndex(i);
        setCurrentBoard(item);
      });
  }, [board, currentPathname]);
  console.log(index);
  return (
    <div className='mt-5  '>
      <h1 className='text-center'>{currentBoard.name}</h1>
      <div className=''>
        <NewColumn currentIndex={index} />
      </div>
    </div>
  );
};

export default CurrentBoard;
