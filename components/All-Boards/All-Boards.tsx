'use client';
import {FC, useEffect, useState} from 'react';
import CreateABoard from './CreateABoard/CreateABoard';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {BoardProps} from '@/types/interfaces';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';

const AllBoards: FC = () => {
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
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    (user.uid || isCreated) &&
      fetchBackData(user.uid, `/current-boards`, setAccessedBoard);
  }, [user, isCreated]);

  const boards = useSelector((state: RootState) => state.boards.boards);
  useEffect(() => {
    setClosedBoard([]);
    setOpenBoard([]);
  }, [boards.length]);

  return (
    <div className='d-block'>
      <button className='d-block btn btn-outline-primary'>создать доску</button>

      <div className='d-flex'>
        <CreateABoard isCreated={(e) => setIsCreated(e)} />
        <div className=''>
          <h3>Ваши доски ( созданные)</h3>
          <div className=''>
            {otherBoard &&
              otherBoard.map(
                (board: any, i: number) =>
                  board.members[user.uid] && (
                    <Link
                      key={i}
                      className='d-block'
                      href={`board/${board?.id}`}
                    >
                      {board.name}
                    </Link>
                  ),
              )}
            <hr />
          </div>

          <h3>закрытые доски</h3>
          <div className=''>
            {closedBoard &&
              closedBoard?.map((item, i) => {
                return (
                  item?.id && (
                    <Link
                      className='d-block'
                      href={`board/${item?.id}`}
                      key={i}
                    >
                      <b> {item?.name}</b>
                    </Link>
                  )
                );
              })}
          </div>
        </div>
      </div>

      {/* <button className='d-block btn btn-outline-dark'>начнни с шаблона</button> */}
      {/* <button type='button' className='d-block btn btn-outline-success'>
        создай рабочее пространство
      </button> */}
    </div>
  );
};

export default AllBoards;
