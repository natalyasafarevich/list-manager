'use client';
import Image from 'next/image';
import styles from './page.module.css';
import UserStatus from '@/components/auth/UserStatus/UserStatus';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {useUserData} from '@/hooks/useUserData';

export default function Home() {
  // const userData = useUserData(user);

  return <main className={`${styles.main}  container`}> </main>;
}
