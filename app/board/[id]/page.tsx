'use client';
import Board from '@/components/Board/Board';
import {usePathname} from 'next/navigation';
export default function BoardPage() {
  const pathname = usePathname();
  return (
    <div>
      <Board />
      <p>Current pathname: {pathname}</p>
    </div>
  );
}
