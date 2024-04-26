'use client';
import CountryList from '@/components/CountryList/CountryList';
import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import {getAdditionalUserData} from '@/store/auth/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export interface InputsProps {
  country: string;
  position: string;
  aboutYourSelf: string;
  avatar: string;
}
interface Step2FormProps {
  isReady: (value: boolean) => void;
}
const Step2Form: FC<Step2FormProps> = ({isReady}) => {
  const [inputs, setInputs] = useState<InputsProps>({
    country: '',
    position: '',
    aboutYourSelf: '',
    avatar: '',
  });

  const dispatch: AppDispatch = useDispatch();

  const submitSecondStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getAdditionalUserData(inputs));
    isReady(true);
  };
  return (
    <form className='step-form' onSubmit={submitSecondStep}>
      <div className='auth-container'>
        <p className='step-form__subtitle'>
          Additional information
          <span>Enter information about yourself</span>
        </p>
        <div className='step-form__user'>
          <ChangePhoto
            uploadedPhoto={(e) => {
              setInputs((prev) => ({...prev, avatar: e}));
            }}
          />
        </div>

        <div className='step-form__item'>
          <label htmlFor='position' className='step-form__label'>
            Your position
          </label>
          <input
            type='text'
            value={inputs.position}
            onChange={(e) =>
              setInputs((prev) => ({...prev, position: e.target.value}))
            }
            className='default-input'
            id='position'
            placeholder='Developer'
          />
        </div>
        <div className='step-form__item'>
          <p className='step-form__label'>Country</p>
          <CountryList
            getCountry={(e) => setInputs((prev) => ({...prev, country: e}))}
          />
        </div>
        <div className='step-form__desc'>
          <p className='step-form__label'>Write some words about yourself</p>
          <textarea
            name=''
            defaultValue={inputs.aboutYourSelf}
            className='step-form__textarea'
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                aboutYourSelf: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
      <button className='button-dark'>Submit</button>
    </form>
  );
};

export default Step2Form;
