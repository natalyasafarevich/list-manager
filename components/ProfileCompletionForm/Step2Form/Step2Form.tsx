'use client';
import CountryList from '@/components/CountryList/CountryList';
import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import {RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';

interface InputsProps {
  country: string;
}

const Step2Form: FC = () => {
  const [inputs, setInputs] = useState<InputsProps>({country: ''});
  const user = useSelector((state: RootState) => state.userdata);
  // console.log(user.photoURL);
  return (
    <form className='step-form'>
      <div className='auth-container'>
        <p className='step-form__subtitle'>
          Contact details
          <span>Enter your contact details</span>
        </p>
        <div className='step-form__user'>
          <ChangePhoto />
          {/* <div
            className='step-form__img'
            style={{background: `center/cover no-repeat url(${user.photoURL})`}}
          ></div> */}
        </div>

        <CountryList
          getCountry={(e) => setInputs((prev) => ({...prev, country: e}))}
        />
      </div>
    </form>
  );
};

export default Step2Form;
