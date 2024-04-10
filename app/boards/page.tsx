'use client';
import BoardsList from '@/components/BoardsList/BoardsList';
import CreateBoardForm from '@/components/CreateBoardForm/CreateBoardForm';
// import  from '@/components/CreateBoardForm/CreateBoardForm';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import {useState} from 'react';

export default function AllBoardsPage() {
  const [isCreated, setIsCreated] = useState(false);
  return (
    <div>
      <DashboardHeader />
      <div className='medium-content-wrap padding-2-3'></div>
      {/* <CreateBoardForm isCreated={(e) => setIsCreated(e)} /> */}
      {/* <h1 className='text-align-center'>BOARDS PAGE</h1> */}
      <BoardsList />
    </div>
  );
}
