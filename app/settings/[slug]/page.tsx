'use client';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import Header from '@/components/Header/Header';
import {AccountManagement} from '@/components/user/settings/AccountManagement/AccountManagement';

export default function AdditionSettings() {
  return (
    <div>
      <DashboardHeader />
      <AccountManagement />
    </div>
  );
}
