'use client';
import CurrentBoard from '@/components/CurrentBoard/Board';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';

const BoardPage: FC = () => {
  const board = useSelector((state: RootState) => state.boards.currentBoards);
  return (
    <>
      <div
        className='board-bg'
        style={{
          background: board.currentBg ? `center/cover no-repeat url(${board.currentBg})` : board.currentColor,
        }}
      ></div>
      <DashboardHeader />
      <CurrentBoard />
    </>
  );
};
export default BoardPage;
