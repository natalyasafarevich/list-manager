import React from 'react';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import UserStatus from '@/components/auth/UserStatus/UserStatus';
import ReduxProvider from '@/providers/ReduxProvider';
import Header from '@/components/Header/Header';
import MainHeader from '@/components/MainHeader/MainHeader';
import Notifications from '@/components/Notifications/Notifications';
import WrapProvider from '@/providers/WrapProvider';
import MessageStatusTracking from '@/providers/MessageStatusTracking';
import './globals.scss';
import {meta_desc} from '@/variables/metadata';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});
export const metadata: Metadata = {
  title: {
    template: 'HiveMind',
    default: 'HiveMind',
  },
  icons: {
    icon: 'fdfgdf.ico',
  },
  description: meta_desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang='en'>
        <body className={poppins.className}>
          <Header />
          <div className='flex-basic'>
            <MessageStatusTracking>
              <MainHeader />
              <WrapProvider>
                <UserStatus />
                {children}
              </WrapProvider>
              <Notifications />
            </MessageStatusTracking>
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
