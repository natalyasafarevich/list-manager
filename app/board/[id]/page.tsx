// 'use client';
import CurrentBoard from '@/components/CurrentBoard/Board';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import firebaseApp from '@/firebase';
import {getDefaultData} from '@/helper/getFirebaseData';
import {RootState} from '@/store/store';
import {meta_desc} from '@/variables/metadata';
import {getDatabase, onValue, ref} from 'firebase/database';
import type {Metadata, ResolvingMetadata} from 'next';
import Head from 'next/head';
import {resolve} from 'path';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

type Props = {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = params.id;
  const db = getDatabase(firebaseApp);
  // fetch data
  const product = await getDefaultData(`boards/${id}`);
  // const starCountRef = ref(db, 'boards/' + params.id);
  // const product = onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   resolve(data);
  //   return data;
  // });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  console.log(product);
  return {
    title: {absolute: product?.name},
    description: product?.description.replace(/<[^>]*>/g, '') || meta_desc,
    openGraph: {
      images: [
        {
          url: product.currentBg,
          width: 800,
          height: 600,
          alt: 'Preview Image',
        },
        ...previousImages,
      ],
    },
  };
}
// const db = getDatabase(firebaseApp);
// const starCountRef = ref(db, 'users/' + userId + params);
// onValue(
//   starCountRef,
//   (snapshot) => {
//     const data = snapshot.val();
//     resolve(data);
//   },
//   (error) => {
//     reject(error);
//   },
// );
export default function BoardPage({params, searchParams}: Props) {
  const db = getDatabase(firebaseApp);
  // const board = useSelector((state: RootState) => state.boards.currentBoards);
  const starCountRef = ref(db, 'boards/' + params.id);
  const product = onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    resolve(data);
    return data;
  });

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  // console.log(product.);
  return (
    <div>
      <div
        className='board-bg'
        style={
          {
            // background: board.currentBg ? `center/cover no-repeat url(${board.currentBg})` : board.currentColor,
          }
        }
      ></div>
      <DashboardHeader />
      <CurrentBoard />
    </div>
  );
}
