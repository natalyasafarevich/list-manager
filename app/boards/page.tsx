'use client';

import BoardsList from '@/components/BoardsList/BoardsList';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';

export default function AllBoardsPage() {
  return (
    <div>
      <DashboardHeader />

      <BoardsList />
    </div>
  );
}
