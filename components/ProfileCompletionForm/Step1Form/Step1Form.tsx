'use client';
import React, {FC, useEffect, useState} from 'react';
import './Step1Form.scss';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch} from 'react-redux';
import {getBasicUserData} from '@/store/auth/actions';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData} from '@/helper/updateUserData';

export interface BasicUserInfo {
  fullName: string;
  publicName: string;
  email: string;
  phoneNumber: string;
  isEmailExist: boolean;
  isPhoneExist: boolean;
}

interface Step1FormProps {
  isReady: (value: boolean) => void;
}
const Step1Form: FC<Step1FormProps> = ({isReady}) => {
  const [inputs, setInputs] = useState<BasicUserInfo>({} as BasicUserInfo);
  const [userNames, setUserNames] = useState<Array<string> | null>(null);
  const [error, setError] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {}, [user]);
  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      fullName: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
      isEmailExist: user.email ? true : false,
      isPhoneExist: user.phoneNumber ? true : false,
    }));
    user.uid && fetchBackDefaultData('user-names', setUserNames);
  }, [user]);

  const checkPublicName = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    setInputs((prev) => ({
      ...prev,
      publicName: currentTarget.value,
    }));
  };
  const changePhone = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '');
    setInputs((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9_.]+$/;
    if (!regex.test(inputs.publicName)) {
      setError(`Use only letters, numbers, dots, and underscores (_)`);
      return;
    }
    if (userNames?.includes(inputs.publicName)) {
      setError(`Public name already exists`);
      return;
    }
    setError('');
    dispatch(getBasicUserData(inputs));
    isReady(true);
  };
  return (
    <form className='step-form' onSubmit={submitForm}>
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
                Public name *
              </label>
              <input
                type='public-name'
                className='default-input'
                id='text'
                value={inputs.publicName}
                onChange={checkPublicName}
                required
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
                minLength={9}
                maxLength={11}
                type='phone'
                className='default-input'
                id='text'
                placeholder='(123) 456 - 7890'
                value={inputs.phoneNumber}
                onChange={changePhone}
                readOnly={inputs.isPhoneExist}
              />
            </div>
          </div>
        </div>
      </div>
      <button className='button-dark'>Next step</button>
    </form>
  );
};

export default Step1Form;
