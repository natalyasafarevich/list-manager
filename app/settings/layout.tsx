'use client';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardHeader />
      <div className='d-flex mt-5 justify-content-center mb-4'>
        <Link
          className='m-2 d-block nav-link text-success'
          href={'/settings/profile'}
        >
          Профиль и видимость
        </Link>
        <Link className='m-2 d-block text-success' href={'/settings/security'}>
          Безопасность
        </Link>
        <Link className='m-2 d-block text-success' href={'/settings/email'}>
          Электронная почта
        </Link>
      </div>
      {children}
    </>
  );
}
