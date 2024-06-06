import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Sing up',
  },
  description: `Join HiveMind and unlock a world of possibilities!
   Dive into our platform to access exclusive features, personalized 
   recommendations, and seamless user experience. Sign up today and embark 
   on your journey to enhanced productivity and success with HiveMind.`,
};
export default function Registration() {
  return (
    <>
      <RegistrationForm />
    </>
  );
}
