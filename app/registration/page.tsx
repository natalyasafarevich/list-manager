import RegistrationComponent from '@/components/authMethods/email-password/EmailPassword';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import UserStatus from '@/components/UserStatus/UserStatus';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

export default function Registration() {
  return (
    <>
      <RegistrationForm />
      <UserStatus />
      {/* <RegistrationComponent />
      <Link href={'/registration?google'}>Google</Link>
      <br />
      <Link href={'/registration?phone'}>Phone</Link> */}
    </>
  );
}
