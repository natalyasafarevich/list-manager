import React from 'react';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';

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
