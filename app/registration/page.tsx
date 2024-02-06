import RegistrationComponent from '@/components/authMethods/email-password/EmailPassword';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import UserStatus from '@/components/auth/UserStatus/UserStatus';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

export default function Registration() {
  return (
    <>
      <RegistrationForm />

      {/* <RegistrationComponent />
      <Link href={'/registration?google'}>Google</Link>
      <br />
      <Link href={'/registration?phone'}>Phone</Link> */}
    </>
  );
}
