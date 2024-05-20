'use client';
import {RootState} from '@/store/store';
import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

const WrapProvider = ({children}: {children: ReactNode}) => {
  const user = useSelector((state: RootState) => state.userdata.uid);
  if (user) {
    return <div className='wrap-85-scroll'> {children}</div>;
  } else {
    return <div className='wrap-85'>{children} </div>;
  }
};

export default WrapProvider;
