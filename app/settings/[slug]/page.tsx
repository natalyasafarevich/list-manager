import {AccountManagement} from '@/components/user/settings/AccountManagement/AccountManagement';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: {
    absolute: 'Settings',
  },
};

export default function AdditionSettings() {
  return (
    <div>
      <div className='medium-content-wrap'>
        <AccountManagement />
      </div>
    </div>
  );
}
