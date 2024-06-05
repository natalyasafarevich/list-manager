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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});
export const metadata: Metadata = {
  title: {
    template: 'HiveMind',
    default: 'HiveMind',
  },
  description: `HiveMind is a task manager that helps you organize, plan, and track your work with ease.
  Never lose important details and always stay on track with HiveMind's intelligent task management features.`,
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
