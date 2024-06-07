import Inbox from '@/components/Inbox/Inbox';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: {
    absolute: 'Inbox',
  },
};
export default function Page() {
  return <Inbox />;
}
