'use client';
import {RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Board: FC = () => {
  const [currentBoard, setCurrentBoard] = useState();
  const board = useSelector((state: RootState) => state.boards);
  useEffect(() => {
    board.map((item: any) => {
      if (item.id.includes('3abed')) {
        setCurrentBoard(item);
      }
    });
  }, [board]);
  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);
  return <div className=''></div>;
};

export default Board;
