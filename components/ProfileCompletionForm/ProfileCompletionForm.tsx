import {FC} from 'react';
import './ProfileCompletionForm.scss';
import Step1Form from './Step1Form/Step1Form';

const ProfileCompletionForm: FC = () => {
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
          <form className='completion-form__box'>
            <div className='completion-form__item'>
              <Step1Form />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionForm;
