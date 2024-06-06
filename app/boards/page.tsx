import BoardsList from '@/components/BoardsList/BoardsList';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Boards',
  },
  openGraph: {
    images: ['/logo.svg'],
  },
};
export default function AllBoardsPage() {
  return (
    <div>
      <DashboardHeader />
      <BoardsList />
    </div>
  );
}
