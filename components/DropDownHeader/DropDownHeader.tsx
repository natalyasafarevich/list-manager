'use client';
import {FC, useEffect, useState} from 'react';
import './DropDownHeader.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Link from 'next/link';

interface BoardsProps {
  bg: string;
  name: string;
  id: string;
}

const DropDownHeader: FC = () => {
  const [favoriteBoards, setFavoriteBoards] = useState<Array<BoardsProps>>([]);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    for (const uid in boards) {
      if (boards[uid].favoriteUid && boards[uid].favoriteUid[user.uid]) {
        setFavoriteBoards((prev: any) => [
          ...prev,
          {
            bg: boards[uid].currentBg,
            name: boards[uid].name,
            id: boards[uid].id,
          },
        ]);
      }
    }
  }, [boards]);
  // console.log(boards);
  return (
    <div className='dropdown-header'>
      <div className='dropdown-header__container'>
        {favoriteBoards.length ? (
          favoriteBoards?.map((board, i) => (
            <Link
              href={`/board/${board.id}`}
              key={i}
              className='dropdown-header__box flex'
            >
              <span
                className='dropdown-header__bg'
                style={{background: `center/cover no-repeat url(${board.bg})`}}
              ></span>
              <span className='dropdown-header__name'>{board.name}</span>
            </Link>
          ))
        ) : (
          <p className='dropdown-header__desc'>
            You don`t have favorite boards
          </p>
        )}
      </div>
    </div>
  );
};

export default DropDownHeader;
