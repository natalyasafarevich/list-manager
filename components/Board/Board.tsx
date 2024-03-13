'use client';
import {RootState} from '@/store/store';
import {useUrl} from 'nextjs-current-url';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export type PayloadProps = {
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
};
const initialBoard = {
  name: '',
  currentBg: '',
  visibility: '',
  id: '',
};

const Board: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<PayloadProps>(initialBoard);
  const [currentPathname, setCurrentPathname] = useState<string>('');

  const {pathname} = useUrl() ?? {};
  useEffect(() => {
    const parts = pathname ? pathname.split('/') : [];
    const lastPart = parts.length > 0 ? parts[parts.length - 1] : '';
    setCurrentPathname(lastPart);
  }, [pathname]);

  useEffect(() => {});
  const board = useSelector((state: RootState) => state.boards);

  useEffect(() => {
    if (currentPathname && board)
      board.map((item) => {
        if (!item.id.includes(currentPathname)) {
          return;
        }
        console.log(item.id, currentPathname);
        setCurrentBoard(item);
      });
  }, [board, currentPathname]);

  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);
  return (
    <div className='mt-5  '>
      <b>{currentPathname}</b>
      <br />
      pathname: <b>{pathname?.slice(-1, -5)}</b>
      <h1 className='text-center'>{currentBoard.name}</h1>
      {/* <R/> */}
    </div>
  );
};

export default Board;
