'use client';
import {FC, useEffect, useState} from 'react';
import './ProfileCompletionForm.scss';
import Step1Form from './Step1Form/Step1Form';
import Step2Form from './Step2Form/Step2Form';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {getUserNames} from '@/store/auth/actions';
import {getAdditionalInfo} from '@/store/data-user/actions';

const ProfileCompletionForm: FC = () => {
  const [isFirstStepReady, setIsFirstStepReady] = useState(false);
  const [isSecondStepReady, setIsSecondStepReady] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.uid);
  const data = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [userNames, setUserNames] = useState<any>({});

  useEffect(() => {
    if (isSecondStepReady) {
      updateUserData(`${user}`, {
        'additional-info': {
          ...data.first_step_data,
          ...data.second_step_data,
        },
      });
      setUserNames((prev: any) => ({...prev, [data.first_step_data.publicName]: user}));
      setIsSubmit(true);
      setIsSecondStepReady(false);
    }
  }, [isSecondStepReady]);
  const [additionalInfo, setAdditionalInfo] = useState<any>();
  useEffect(() => {
    if (isSubmit) {
      updateFirebaseData('/usernames', userNames);
      setIsSubmit(false);
      fetchBackDefaultData(`/users/${user}/additional-info`, setAdditionalInfo);
    }
  }, [isSubmit]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (additionalInfo) {
      dispatch(getAdditionalInfo(additionalInfo));
      router.push('/boards', {scroll: true});
    }
  }, [additionalInfo]);
  useEffect(() => {
    fetchBackDefaultData('/usernames', setUserNames);
  }, []);
  return (
    <div className='completion-form'>
      <div className='completion-form__container'>
        <div className='completion-form__wrap'>
          <p className='completion-form__title'>
            Complete Your Profile
            <span>
              Please fill in the additional information to complete your profile. This will help us personalize your
              experience and connect you with relevant content and services.
            </span>
          </p>
          <div className='completion-form__item'>
            {!isFirstStepReady ? (
              <Step1Form isReady={(e) => setIsFirstStepReady(e)} />
            ) : (
              <Step2Form isReady={(e) => setIsSecondStepReady(e)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionForm;
