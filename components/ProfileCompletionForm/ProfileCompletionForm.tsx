'use client';
import {FC, useState} from 'react';
import './ProfileCompletionForm.scss';
import Step1Form from './Step1Form/Step1Form';
import Step2Form from './Step2Form/Step2Form';

const ProfileCompletionForm: FC = () => {
  const [isFirstStepReady, setIsFirstStepReady] = useState(false);
  return (
    <div className='completion-form'>
      <div className='completion-form__container'>
        <div className='completion-form__wrap'>
          <p className='completion-form__title'>
            Complete Your Profile
            <span>
              Please fill in the additional information to complete your
              profile. This will help us personalize your experience and connect
              you with relevant content and services.
            </span>
          </p>
          {/* <form className='completion-form__box'> */}
          <div className='completion-form__item'>
            {!isFirstStepReady ? (
              <Step1Form isReady={(e) => setIsFirstStepReady(e)} />
            ) : (
              <Step2Form />
            )}
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionForm;
