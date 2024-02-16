'use client';
import firebaseApp from '@/firebase';
import {RootState} from '@/store/store';
import {getDatabase, ref, set, onValue} from 'firebase/database';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
// import { getDatabase, ref,  } from "firebase/database";

import {createdBoard} from '@/variables/variables';
import Link from 'next/link';
import {AccountManagement} from '@/components/user/settings/AccountManagement/AccountManagement';
const db = getDatabase();

// УПРАВЛЕНИЕ АККАУНТОМ
export default function Settings() {
  // writeUserData('UtegspYscmbATUOzJ9myuTCHK6q1', 'name', 'email', 'imageUrl');
  // let [board, setBoard] = useState(createdBoard);

  return (
    <>
      <h1>hi </h1>
      <Link href={'/settings?profile'}>Профиль и видимость</Link>
      <br />
      <Link href={'/settings?security'}>Безопасность</Link>
      <AccountManagement />
    </>
  );
}
