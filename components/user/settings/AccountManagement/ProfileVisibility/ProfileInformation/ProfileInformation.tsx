import {AppDispatch, RootState} from '@/store/store';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './ProfileInformation.scss';

import {useDispatch} from 'react-redux';
import InputField from './InputField/InputField';
import {updateUserData} from '@/helper/updateUserData';
import CountryList from '@/components/CountryList/CountryList';
import {getAdditionalInfo} from '@/store/data-user/actions';
import PopupMessage, {
  PopupMessageProps,
} from '@/components/PopupMessage/PopupMessage';

const ProfileInformation = () => {
  const user = useSelector((state: RootState) => state.userdata);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [popupInfo, setPopupInfo] = useState<PopupMessageProps>({
    title: '',
    messageType: '',
    message: '',
  });
  const dispatch: AppDispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const user_names = useSelector((state: RootState) => state.auth.user_names);
  const [generalInfo, setGeneralInfo] = useState({
    fullName: '',
    publicName: '',
    position: '',
    phoneNumber: '',
    country: '',
    email: '',
    aboutYourSelf: '',
    mainPhoto: '',
  });

  const fields: any[] = [
    {
      label: 'Full name',
      value: generalInfo?.fullName || '',
      readOnly: false,
      setValue: (value: string) => {
        setIsChanged(true);
        setGeneralInfo((prevState) => ({...prevState, fullName: value}));
      },
    },
    {
      label: 'Public name',
      value: generalInfo?.publicName || '',
      readOnly: false,
      setValue: (value: string) => {
        setIsChanged(true);
        setGeneralInfo((prevState) => ({...prevState, publicName: value}));
      },
      // setPrevPublicName: generalInfo?.publicName || ''
    },
    {
      label: 'Profession',
      value: generalInfo?.position || '',
      readOnly: false,
      setValue: (value: string) => {
        setIsChanged(true);
        setGeneralInfo((prevState) => ({...prevState, position: value}));
      },
    },
    {
      label: 'Phone',
      value: generalInfo?.phoneNumber || '',
      // readOnly: generalInfo?.phoneNumber.length === 9,
      setValue: (value: string) => {
        setIsChanged(true);
        setGeneralInfo((prevState) => ({...prevState, phoneNumber: value}));
      },
    },
    {
      label: 'Email',
      value: generalInfo?.email,
      readOnly: true,
    },
    {
      label: 'UID',
      value: user?.uid,
      readOnly: true,
    },
  ];
  const [error, setError] = useState('');
  const data = useSelector(
    (state: RootState) => state.userdata.additional_info,
  );
  useEffect(() => {
    setGeneralInfo(data);
  }, [data]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      data.publicName !== generalInfo.publicName &&
      user_names.includes(generalInfo.publicName)
    ) {
      setIsOpenMessage(true);
      setPopupInfo((prev) => ({
        ...prev,
        title: 'Public name',
        messageType: 'error',
        message: 'Public name already exists',
      }));
      setError('Public name already exists');
      return;
    }
    setError('');
    setIsChanged(false);
    setPopupInfo({title: '', messageType: '', message: ''});
    setIsOpenMessage(true);
    updateUserData(`${user.uid}/additional-info`, generalInfo);
    setPopupInfo({
      title: 'Successfully',
      messageType: 'success',
      message: 'Data is updated successfully',
    });
    setIsUpdated(true);
  };
  useEffect(() => {
    if (isUpdated) {
      dispatch(getAdditionalInfo(generalInfo));
      // setTimeout(() => {
      setIsUpdated(false);
      return;
    }
    if (isOpenMessage) {
      setTimeout(() => {
        setIsOpenMessage(false);
      }, 4000);
    }
  }, [isUpdated, isOpenMessage]);
  const [isChanged, setIsChanged] = useState(false);
  return (
    <form onSubmit={handleSubmit} className='profile-information'>
      {isOpenMessage && <PopupMessage {...popupInfo} />}
      <div className='profile-information__box'>
        {fields.map((field, index) => (
          <div key={index} className='profile-information__item'>
            <InputField
              label={field.label}
              value={field.value}
              changedValue={field.setValue}
              readOnly={field.readOnly}
            />
            {field.label === 'Public name' && (
              <p className='text-error'>{error}</p>
            )}
          </div>
        ))}
      </div>
      <div className='profile-information__country'>
        <p className='profile-information__subtitle'>Country</p>

        <CountryList
          getCountry={(e) =>
            setGeneralInfo((prevState) => ({...prevState, country: e}))
          }
          currentCountry={generalInfo?.country}
        />
      </div>
      <p className='profile-information__subtitle'>About me</p>
      <textarea
        className='profile-information__textarea'
        defaultValue={generalInfo?.aboutYourSelf}
        onChange={(e) => {
          setIsChanged(true);
          setGeneralInfo((prevState) => ({
            ...prevState,
            aboutYourSelf: e.target.value,
          }));
        }}
      ></textarea>
      {isChanged && (
        <button
          className='button-dark profile-information__button'
          type='submit'
        >
          Save
        </button>
      )}
    </form>
  );
};
export default ProfileInformation;
