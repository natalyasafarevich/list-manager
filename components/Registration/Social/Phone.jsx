import React, {useState, useEffect} from 'react';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';

const PhoneSignInComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Инициализация reCAPTCHA при загрузке компонента
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          // Response expired. Ask the user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired. Please solve it again.');
        },
      },
    );
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSendCode = async () => {
    try {
      // Используйте глобальный recaptchaVerifier из window
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
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const code = verificationCode;
      const confirmationResult = window.confirmationResult;

      if (!confirmationResult) {
        throw new Error('Confirmation result is not available');
      }

      await confirmationResult.confirm(code);
      console.log('User signed in successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Вход с помощью мобильного телефона</h2>
      <div>
        <label>Номер телефона:</label>
        <input
          type='tel'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSendCode}>Отправить код</button>

      <div>
        <label>Код подтверждения:</label>
        <input
          type='text'
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
      <button onClick={handleVerifyCode}>Подтвердить код</button>

      <div id='recaptcha-container'></div>

      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default PhoneSignInComponent;
