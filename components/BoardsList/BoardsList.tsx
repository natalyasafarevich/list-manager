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

const BoardsList: FC = () => {
  const [closedBoard, setClosedBoard] = useState<Array<BoardProps>>([]);
  const user = useSelector((state: RootState) => state.userdata);
  const [openBoard, setOpenBoard] = useState<Array<BoardProps>>([]);
  const db = getDatabase(firebaseApp);

  const [accessedBoard, setAccessedBoard] = useState<any>();
  const [otherBoard, setOtherBoard] = useState<Array<any>>([]);
  useEffect(() => {
    if (accessedBoard) {
      setOtherBoard([]);
      for (const id in accessedBoard) {
        const starCountRef = ref(db, `boards/${id}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data && !data.isCloseBoard) {
            setOtherBoard((prev: any) => [...prev, data]);
          } else {
            setClosedBoard((prev: any) => [...prev, data]);
          }
        });
      }
    } else {
      console.log(' у вас не доcок');
    }
  }, [accessedBoard]);

  useEffect(() => {
    user.uid && fetchBackData(user.uid, `/current-boards`, setAccessedBoard);
  }, [user]);
  const boards = useSelector((state: RootState) => state.boards.boards);
  useEffect(() => {
    setClosedBoard([]);
    setOpenBoard([]);
  }, [boards.length]);
  // console.log(boards);
  return (
    <div className='boards-list'>
      <div className='boards-list__container padding-2-3'>
        <p className='boards-list__title'>Your boards</p>
        <div className='boards-list__box'>
          {otherBoard &&
            otherBoard.map(
              (board: any, i: number) =>
                board.members[user.uid] && (
                  <Link
                    key={i}
                    className='boards-list__item'
                    href={`board/${board?.id}`}
                  >
                    <span
                      className='boards-list__bg'
                      style={{
                        background: `center/cover no-repeat url(${board.currentBg})`,
                      }}
                    ></span>

                    <span className='boards-list__name'>{board.name}</span>
                    <span className='boards-list__type'>{board.type}</span>
                    <span className='boards-list__date'>
                      {board.creationDate}
                    </span>
                  </Link>
                ),
            )}
        </div>
        <p className='boards-list__subtitle'>Closed boards</p>
        <div className='boards-list__box'>
          {closedBoard &&
            closedBoard?.map((board, i) => {
              return (
                board?.id && (
                  <Link
                    key={i}
                    className='boards-list__item boards-list__item_closed '
                    href={`board/${board?.id}`}
                  >
                    <span
                      className='boards-list__bg'
                      style={{
                        background: `center/cover no-repeat url(${board.currentBg})`,
                      }}
                    ></span>

                    <span className='boards-list__name'>{board.name}</span>
                    <span className='boards-list__type'>{board.type}</span>
                    <span className='boards-list__date'>
                      {board.creationDate}
                    </span>
                  </Link>
                )
              );
            })}
        </div>
      </div>

      {/* <button className='d-block btn btn-outline-dark'>начнни с шаблона</button> */}
      {/* <button type='button' className='d-block btn btn-outline-success'>
        создай рабочее пространство
      </button> */}
    </div>
  );
};

export default BoardsList;
