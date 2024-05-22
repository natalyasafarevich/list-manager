import React, {useState, useEffect} from 'react';
import './Phone.scss';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import InputField from '@/components/InputField/InputField';
import {useRouter} from 'next/navigation';

const PhoneSignInComponent = () => {
  const [isSend, setIsSend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'normal',
        'expired-callback': () => {
          console.log('reCAPTCHA expired. Please solve it again.');
        },
      },
    );
  }, []);

  const handleSendCode = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;

      if (!appVerifier) {
        throw new Error('RecaptchaVerifier is not initialized');
      }

      const auth = getAuth();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      window.confirmationResult = confirmationResult;
      setIsSend(true);
      setError('');
    } catch (error) {
      setIsSend(false);
      setError(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const code = verificationCode;

      const confirmationResult = window.confirmationResult;
      router.push('/');
      if (!confirmationResult) {
        throw new Error('Confirmation result is not available');
      }

      setError('');
      await confirmationResult.confirm(code);
      setIsSend(true);
    } catch (error) {
      setError('Wrong code, please try again');
    }
  };

  const handleCodeInputChange = (index, value) => {
    const newCode = verificationCode.split('');
    newCode[index] = value;
    setVerificationCode(newCode.join(''));

    const maxLength = 1;
    if (value.length === maxLength && index < 5) {
      const nextInput = document.getElementById(`codeInput${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className='register phone-register'>
      <p className='register__subtitle'>Sign in with phone</p>
      {!isSend && (
        <>
          <div>
            <InputField
              className={`register__input`}
              label='Your phone number'
              id={'phone'}
              type='text'
              placeholder='+99 0 00 00 00 00'
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            {error && <p className='text-error'>{error}</p>}
            <div className='phone-register__recapcha'>
              <div id='recaptcha-container'></div>
            </div>
          </div>
          <button
            className='button-dark phone-register__button'
            onClick={handleSendCode}
          >
            Send code
          </button>
        </>
      )}
      {isSend && (
        <>
          <div>
            <p className='phone-register__text'>
              We’ve sent an SMS with an activation code to your phone
              <span> {phoneNumber}</span>
            </p>

            <div className='phone-register__row'>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  className={` ${error ? 'input-error' : ''} register__input`}
                  type='text'
                  maxLength='1'
                  autoFocus={index === 0}
                  id={`codeInput${index}`}
                  onChange={(e) => handleCodeInputChange(index, e.target.value)}
                />
              ))}
            </div>
            {error && (
              <>
                {' '}
                <p className='text-center text-error'>{error}</p>
                <br />
              </>
            )}
          </div>
          <button className='button-dark ' onClick={handleVerifyCode}>
            Confirm code
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneSignInComponent;
