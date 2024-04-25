'use client';
import {FC, useEffect, useState} from 'react';
import './Step1Form.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
// import CustomInput from '../CustomInput/CustomInput';
interface BasicInfo {
  fullName: string;
  publicName: string;
  email: string;
  phoneNumber: string;
  isEmailExist: boolean;
  isPhoneExist: boolean;
}
const Step1Form: FC = () => {
  const [inputs, setInputs] = useState<BasicInfo>({
    fullName: '',
    publicName: '',
    email: '',
    phoneNumber: '',
    isEmailExist: false,
    isPhoneExist: false,
  });
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      fullName: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
      isEmailExist: user.email ? true : false,
      isPhoneExist: user.phoneNumber ? true : false,
    }));
  }, [user]);

  const [error, setError] = useState('');

  const checkPublicName = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    const value = currentTarget.value;
    const regex = /^[a-zA-Z0-9_.]+$/;
    if (!regex.test(value)) {
      setError('Use only letters, numbers, dots, and underscores (_)');
      return;
    }
    setError('');
    setInputs((prev) => ({
      ...prev,
      publicName: currentTarget.value,
    }));
  };
  return (
    <div className='step-form '>
      <div className='step-form__container  '>
        <div className='auth-container'>
          <p className='step-form__subtitle'>
            Contact details
            <span>Enter your contact details</span>
          </p>
          <div className='step-form__row'>
            <div className='step-form__box'>
              <label htmlFor={'full-name'} className='step-form__label'>
                Name
              </label>
              <input
                type='text'
                className='default-input'
                id='full-name'
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
            <div className='step-form__box'>
              <label htmlFor={'public-name'} className='step-form__label'>
                Public name
              </label>
              <input
                type='public-name'
                className='default-input'
                id='text'
                value={inputs.publicName}
                onChange={checkPublicName}
              />
              <p className='text-error'>{error}</p>
            </div>
            <div className='step-form__box'>
              <label htmlFor={'email'} className='step-form__label'>
                Email
              </label>
              <input
                type='email'
                className='default-input'
                id='email'
                value={inputs.email}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                readOnly={inputs.isEmailExist}
              />
            </div>
            <div className='step-form__box'>
              <label htmlFor={'phone'} className='step-form__label'>
                Phone
              </label>
              <input
                type='phone'
                className='default-input'
                id='text'
                value={inputs.phoneNumber}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                readOnly={inputs.isPhoneExist}
              />
            </div>
          </div>
        </div>
      </div>
      <button className='button-dark'>Next step</button>
    </div>
  );
};

export default Step1Form;
