'use client';
import {FC, useEffect, useState} from 'react';
import CreateABoard from './CreateABoard/CreateABoard';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {BoardProps} from '@/types/interfaces';

const AllBoards: FC = () => {
  const [closedBoard, setClosedBoard] = useState<Array<BoardProps>>([]);
  const [openBoard, setOpenBoard] = useState<Array<BoardProps>>([]);

  const boards = useSelector((state: RootState) => state.boards.boards);
  useEffect(() => {
    setClosedBoard([]);
    setOpenBoard([]);

    if (boards.length)
      boards.map((board) =>
        board.isCloseBoard
          ? setClosedBoard((prev) => [...prev, board])
          : setOpenBoard((prev) => [...prev, board]),
      );
  }, [boards.length]);

  return (
    <div className='d-block'>
      <button className='d-block btn btn-outline-primary'>создать доску</button>

      <div className='d-flex'>
        <CreateABoard />
        <div className=''>
          <h3>Ваши доски ( созданные)</h3>
          <div className=''>
            {openBoard.map((item, i) => {
              return (
                <Link
                  className='d-block'
                  href={`board/${item.id.slice(0, 5)}`}
                  key={i}
                >
                  <b> {item.name}</b>
                </Link>
              );
            })}
          </div>

          <h3>закрытые доски</h3>
          <div className=''>
            {closedBoard.map((item, i) => {
              return (
                <Link
                  className='d-block'
                  href={`board/${item.id.slice(0, 5)}`}
                  key={i}
                >
                  <b> {item.name}</b>
                </Link>
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
