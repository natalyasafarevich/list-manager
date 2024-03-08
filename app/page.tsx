import Image from 'next/image';
import styles from './page.module.css';
import UserStatus from '@/components/auth/UserStatus/UserStatus';

export default function Home() {
  return <main className={`${styles.main}  container`}></main>;
}
