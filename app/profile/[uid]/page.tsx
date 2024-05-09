// import {useRouter} from 'next/router';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import UserProfileComponent from '@/components/UserProfileComponent/UserProfileComponent';

export default function UserProfile({params}: {params: {uid: string}}) {
  return (
    <>
      <DashboardHeader />
      <UserProfileComponent uid={params.uid} />
    </>
  );
}
