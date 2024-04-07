import AllBoards from '@/components/All-Boards/All-Boards';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';

export default function AllBoardsPage() {
  return (
    <div>
      <DashboardHeader />
      <h1 className='text-align-center'>BOARDS PAGE</h1>
      <AllBoards />
    </div>
  );
}
