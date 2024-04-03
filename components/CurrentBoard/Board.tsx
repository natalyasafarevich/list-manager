'use client';
import {AppDispatch, RootState} from '@/store/store';
import {useUrl} from 'nextjs-current-url';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnCreator from './Column/ColumnCreator/ColumnCreator';
import './Board.css';

import BoardHeader from './BoardHeader/BoardHeader';
import CloseBoardPopup from './CloseBoardPopup/CloseBoardPopup';
import {getBoardCurrent} from '@/store/board/actions';
import Members from './Members/Members';
import {BoardProps} from '@/types/interfaces';

export type PayloadProps = {
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
  lists?: Array<any>;
  isFavorite?: boolean;
  'text-color'?: string;
  currentColor?: string;
  isCloseBoard?: boolean;
};
const initialBoard = {
  name: '',
  currentBg: '',
  visibility: '',
  id: '',
  members: [],
};

const CurrentBoard: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<BoardProps>(initialBoard);
  const [currentPathname, setCurrentPathname] = useState<string>('');
  const [index, setIndex] = useState<any>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardCurrent(currentBoard, index));
  }, [currentBoard, index]);

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
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (currentBoard['text-color'] === 'light') {
      setIsLight(true);
      return;
    }
    setIsLight(false);
  }, [currentBoard['text-color']]);
  return (
    <div
      className={`p-2 ${isLight ? 'light' : ''}`}
      style={{
        background: currentBoard.currentBg
          ? `center/cover no-repeat url(${currentBoard.currentBg || ''} )`
          : currentBoard.currentColor,
      }}
    >
      <div className='mt-5 '>
        <Members />
        {!currentBoard.isCloseBoard ? (
          <>
            <BoardHeader board={currentBoard} />
            <div className='d-flex justify-content-between'>
              <div className=''>
                <ColumnCreator currentIndex={index} />
              </div>
            </div>
          </>
        ) : (
          <CloseBoardPopup board={currentBoard}></CloseBoardPopup>
        )}
      </div>
    </div>
  );
};

export default CurrentBoard;
