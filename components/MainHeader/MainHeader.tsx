'use client';
import {FC, useState} from 'react';
import Header from '../Header/Header';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import SideBar from '../SideBar/SideBar';

const MainHeader: FC = () => {
  const user = useSelector((state: RootState) => state.userdata.uid);
  if (user) {
    return <SideBar />;
  }
  // return (
  //   // <>
  //   //   <Header />
  //   // </>
  // );
};

export default MainHeader;
