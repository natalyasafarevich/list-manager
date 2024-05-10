'use client';
import {AppDispatch, RootState} from '@/store/store';
import {useUrl} from 'nextjs-current-url';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnCreator from './Column/ColumnCreator/ColumnCreator';
import './Board.scss';

import BoardHeader from './Settings/BoardHeader/BoardHeader';
import CloseBoardPopup from './Settings/CloseBoardPopup/CloseBoardPopup';
import {getBoardCurrent} from '@/store/board/actions';
import Members from './Members/Members';
import {BoardProps} from '@/types/interfaces';
import {getUserStatus} from '@/store/data-user/actions';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';

export type PayloadProps = {
  currentBg?: string;
  id?: string;
  name?: string;
  type?: string;
  lists?: Array<any>;
  isFavorite?: boolean;
  'text-color'?: string;
  currentColor?: string;
  isCloseBoard?: boolean;
};
const initialBoard = {
  name: '',
  currentBg: '',
  type: '',
  id: '',
  members: [],
};

const CurrentBoard: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<any>(initialBoard);
  const [currentPathname, setCurrentPathname] = useState<string>('');
  const [index, setIndex] = useState<any>();
  const [isLightTheme, setIsLightTheme] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const db = getDatabase(firebaseApp);
  const {pathname} = useUrl() ?? {};

  useEffect(() => {
    dispatch(getBoardCurrent(currentBoard, index));
  }, [currentBoard, index]);

  let lastSegment = pathname?.substring(pathname?.lastIndexOf('/') + 1);

  useEffect(() => {
    const starCountRef = ref(db, `boards/${lastSegment}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setCurrentBoard(data);
      }
    });
  }, [lastSegment]);

  const board = useSelector((state: RootState) => state.boards.boards);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (currentPathname && board)
      for (let key in board) {
        if (key.includes(currentPathname)) {
          setIndex(key);
          setCurrentBoard(board[key]);
        }
      }
    if (pathname) {
      const parts = pathname ? pathname.split('/') : [];
      const lastPart = parts.length > 0 ? parts[parts.length - 1] : '';
      setCurrentPathname(lastPart);
    }
  }, [pathname, board, currentPathname]);

  // useEffect(() => {
  //   if (currentPathname && board)
  //     for (let key in board) {
  //       if (key.includes(currentPathname)) {
  //         setIndex(key);
  //         setCurrentBoard(board[key]);
  //       }
  //     }
  // }, [board, currentPathname]);
  const {uid} = useSelector((state: RootState) => state.userdata);
  const [isBoardPrivate, setIsBoardPrivate] = useState(false);
  useEffect(() => {
    currentBoard.type === 'private' && !currentBoard?.members[uid] ? setIsBoardPrivate(true) : setIsBoardPrivate(false);
  }, [currentBoard]);

  useEffect(() => {
    currentBoard.members && dispatch(getUserStatus(currentBoard.members[user.uid]));
    if (currentBoard['text-color'] === 'light') {
      setIsLightTheme(true);
      return;
    } else {
      setIsLightTheme(false);
    }
  }, [currentBoard]);

  if (!currentBoard.id || isBoardPrivate) {
    return (
      <>
        <h1>Доска закрыта или не создана</h1>
      </>
    );
  }
  return (
    <div className='board'>
      {/* <Members /> */}
      <div className='board__container  large-content-wrap plr-3  '>
        <div
          className={` ${isLightTheme ? 'theme-light' : ''}`}
          style={
            {
              // background: currentBoard.currentBg
              //   ? `center/cover no-repeat url(${currentBoard.currentBg || ''} )`
              //   : currentBoard.currentColor,
            }
          }
        >
          <div className=''>
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
      </div>
    </div>
  );
};

export default CurrentBoard;
