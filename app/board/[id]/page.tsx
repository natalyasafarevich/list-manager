'use client';
import CurrentBoard from '@/components/CurrentBoard/Board';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';

export default function BoardPage() {
  return (
    <div>
      <DashboardHeader />
      <CurrentBoard />
    </div>
  );
}
