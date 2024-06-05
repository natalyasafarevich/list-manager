import Footer from '@/components/Footer/Footer';
import AssistancePage from '@/components/pages/AssistancePage/AssistancePage';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Assistance',
  },
  description: `Explore the comprehensive support system provided by our platform.
   From troubleshooting to expert guidance, our assistance ensures seamless navigation
   and optimal utilization of our services, empowering you every step of the way.`,
};
export default function Assistance() {
  return (
    <>
      <AssistancePage />
      <Footer />
    </>
  );
}
