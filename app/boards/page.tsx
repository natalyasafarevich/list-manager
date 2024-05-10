'use client';

import BoardsList from '@/components/BoardsList/BoardsList';
import CreateBoardForm from '@/components/CreateBoardForm/CreateBoardForm';
// import  from '@/components/CreateBoardForm/CreateBoardForm';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import {RootState} from '@/store/store';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export default function AllBoardsPage() {
  return (
    <div>
      <DashboardHeader />

      <BoardsList />
    </div>
  );
}
