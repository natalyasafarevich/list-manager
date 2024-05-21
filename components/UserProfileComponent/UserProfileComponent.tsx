'use client';
import {FC, useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import './UserProfileComponent.scss';
import Link from 'next/link';
import MiniPopup from '../MiniPopup/MiniPopup';
import MassageBox from '../MasseageBox/MassageBox';

interface UserProfileComponentProps {
  uid: string;
}
interface AdditionalInfoProps {
  aboutYourSelf: string;
  country: string;
  email: string;
  fullName: string;
  isEmailExist: boolean;
  isPhoneExist: boolean;
  mainPhoto: {name: string; url: string};
  phoneNumber: string;
  position: string;
  publicName: string;
}

interface UserContactsProps {
  [key: string]: string;
}
const UserProfileComponent: FC<UserProfileComponentProps> = ({uid}) => {
  const [userData, setUserData] = useState<AdditionalInfoProps>();
  const [contacts, setContacts] = useState<UserContactsProps>({});
  useEffect(() => {
    fetchBackDefaultData(`users/${uid}/additional-info`, setUserData);
    fetchBackDefaultData(`users/${uid}/contacts`, setContacts);
  }, [uid]);

  const [isOpen, setIsOpen] = useState(false);
  if (userData)
    return (
      <div className='user-profile'>
        {isOpen && (
          <MiniPopup setIsOpen={setIsOpen} title='title'>
            <MassageBox recipientId={uid} />
          </MiniPopup>
        )}
        <div className='user-profile__container'>
          <div className='user-profile__info'>
            <div
              className='user-profile__img'
              style={{
                background: `center/cover no-repeat url(${userData?.mainPhoto.url})`,
              }}
            ></div>
            <p className='user-profile__name'>
              {userData?.fullName}
              <span>{userData?.position}</span>
            </p>
            <div className='user-profile__social'>
              {contacts &&
                Object.entries(contacts).map(([key, value]) => (
                  <Link
                    key={key}
                    className={`icon-social icon-social__${key}`}
                    target='_blank'
                    href={
                      key === 'telegram'
                        ? `https://t.me/${value}`
                        : key === 'instagram'
                          ? `https://www.instagram.com/${value}`
                          : value
                    }
                  >
                    {key}
                  </Link>
                ))}
            </div>
          </div>
          <div className='user-profile__box'>
            <div className='user-profile__subtitle'> Details</div>
            <p className='user-profile__desc'>
              <span>Location: </span>
              {userData?.country}
            </p>
            <p className='user-profile__desc'>
              <span>Note: </span>
              {userData?.aboutYourSelf}
            </p>
            <button className='user-profile__button button-dark' onClick={() => setIsOpen(!isOpen)}>
              Message
            </button>
          </div>
        </div>
      </div>
    );
};

export default UserProfileComponent;
