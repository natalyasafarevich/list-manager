'use client';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import Link from 'next/link';
import {Suspense} from 'react';
import Loading from './loading';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
