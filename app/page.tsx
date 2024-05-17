'use client';
import Image from 'next/image';
import styles from './page.module.css';
import UserStatus from '@/components/auth/UserStatus/UserStatus';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import HomePage from '@/components/HomePage/HomePage';

export default function Home() {
  return (
    <main className={``}>
      <HomePage />
    </main>
  );
}
