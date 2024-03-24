'use client';
import {FC, useEffect, useState} from 'react';
import CreateABoard from './CreateABoard/CreateABoard';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';
import {PayloadProps} from '../CurrentBoard/Board';

const AllBoards: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<Array<PayloadProps>>([]);
  const boards = useSelector((state: RootState) => state.boards.boards);
  useEffect(() => {
    setCurrentBoard(boards);
  }, [boards]);
  return (
    <div className='d-block'>
      <button className='d-block btn btn-outline-primary'>создать доску</button>

      <div className='d-flex'>
        <CreateABoard />
        <div className=''>
          <h3>Ваши доски ( созданные)</h3>
          <div className=''>
            {boards.map((item: any, i: any) => (
              <Link
                className='d-block'
                href={`board/${item.id.slice(0, 5)}`}
                key={i}
              >
                {item.name}
              </Link>
            ))}
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
