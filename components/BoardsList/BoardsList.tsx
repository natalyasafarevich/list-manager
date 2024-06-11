/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {FC, useEffect, useState} from 'react';
import './BoardsList.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {BoardProps} from '@/types/interfaces';
import {fetchBackData} from '@/helper/getFirebaseData';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import useResponsive from '@/hooks/useResponsive';

const BoardsList: FC = () => {
  const {isMobile} = useResponsive();
  const db = getDatabase(firebaseApp);

  const [accessedBoard, setAccessedBoard] = useState<{[key: string]: boolean}>();
  const [closedBoard, setClosedBoard] = useState<Array<BoardProps>>([]);
  const [currenBoards, setCurrentBoards] = useState<Array<BoardProps>>([]);
  const [isOpen, setIsOpen] = useState(false);

  const boards = useSelector((state: RootState) => state.boards.boards);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (accessedBoard) {
      for (const id in accessedBoard) {
        const starCountRef = ref(db, `boards/${id}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (!data && !data.isCloseBoard) {
            setClosedBoard((prev: any) => [...prev, data]);
          }
        });
      }
    }
  }, [accessedBoard, db]);
  useEffect(() => {
    if (user.uid) {
      // Fetching data about current boards
      fetchBackData(user.uid, `/current-boards`, setAccessedBoard);

      // Resetting closed boards
      setClosedBoard([]);
      // Filtering current user's boards
      const filteredBoards = Object.values<BoardProps>(boards).filter(
        (board) => board.members && board.members[user.uid],
      );
      setCurrentBoards(filteredBoards);
    }
  }, [user, boards]);

  return (
    <div className='boards-list'>
      <div className='boards-list__container padding-2-3'>
        <div className='boards-list__row'>
          <p className='boards-list__title'>Your boards</p>
          {!isMobile && (
            <>
              {' '}
              <button className='button-dark' onClick={() => setIsOpen(!isOpen)}>
                Create a new board
              </button>
              <div className='boards-list__form'>
                <CreateBoardForm setIsOpen={setIsOpen} isClose={isOpen} />
              </div>
            </>
          )}
        </div>
        <div className='boards-list__box'>
          {currenBoards.length ? (
            currenBoards.map(
              (board, i) =>
                board.members &&
                board.members[user.uid] && (
                  <Link key={i} className='boards-list__item' href={`board/${board?.id}`}>
                    <span
                      className='boards-list__bg'
                      style={{
                        background: board.currentBg
                          ? `center/cover no-repeat url(${board.currentBg})`
                          : board.currentColor,
                      }}
                    ></span>
                    <span className='boards-list__name'>{board.name}</span>
                    <span className='boards-list__type'>{board.type}</span>
                    <span className='boards-list__date'>{board.creationDate}</span>
                  </Link>
                ),
            )
          ) : (
            <p className='boards-list__text'>You don`t have any boards</p>
          )}
        </div>
        <p className='boards-list__subtitle'>Closed boards</p>
        <div className='boards-list__box'>
          {closedBoard?.map((board, i) => {
            return (
              board?.id && (
                <Link key={i} className='boards-list__item boards-list__item_closed ' href={`board/${board?.id}`}>
                  <span
                    style={{
                      background: board.currentBg
                        ? `center/cover no-repeat url(${board.currentBg})`
                        : board.currentColor,
                    }}
                  ></span>

                  <span className='boards-list__name'>{board.name}</span>
                  <span className='boards-list__type'>{board.type}</span>
                  <span className='boards-list__date'>{board.creationDate}</span>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardsList;
