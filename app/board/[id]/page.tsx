'use client';
import CurrentBoard from '@/components/CurrentBoard/Board';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';

export default function BoardPage() {
  const board = useSelector((state: RootState) => state.boards.currentBoards);

  return (
    <>
      <div
        className='board-bg'
        style={{
          background: board.currentBg
            ? `center/cover no-repeat url(${board.currentBg})`
            : board.currentColor,
        }}
      ></div>
      <DashboardHeader />
      <CurrentBoard />
    </>
  );
}
