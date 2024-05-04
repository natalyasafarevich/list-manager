import useEmailVerification from '@/hooks/useEmailVerification';
import {FC} from 'react';

const EmailVerification: FC = () => {
  const isVerified = useEmailVerification();
  return (
    <>
      {isVerified === true && <span> confirmed</span>}
      {isVerified === false && <span>unconfirmed</span>}
    </>
  );
};

export default EmailVerification;
