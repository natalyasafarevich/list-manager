import {FC, useEffect, useState} from 'react';
import './Contacts.scss';
import ContactsInput, {ContactLinkItem} from './ContactsInput/ContactsInput';
import {updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import PopupMessage from '../PopupMessage/PopupMessage';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
const contactLink: ContactLinkItem[] = [
  {
    id: 'telegram',
    type: 'telegram',
    placeholder: '@example-name',
  },
  {
    id: 'instagram',
    type: 'instagram',
    placeholder: '@example-name',
  },
  {
    id: 'facebook',
    type: 'facebook',
    placeholder: 'facebook.com/example-name',
  },
  {
    id: 'codepan',
    type: 'codePan',
    placeholder: 'codepen.io/here-your-link',
  },
  {
    id: 'linkedIn',
    type: 'linkedIn',
    placeholder: 'codepen.io/here-your-link',
  },
];

const Contacts: FC = () => {
  const [contactLinks, setContactLinks] = useState<{[key: string]: string}>({});

  const [notification, setNotification] = useState({
    isUpdate: false,
    title: 'Contact links have been updated',
    messageType: 'success',
  });
  const user = useSelector((state: RootState) => state.userdata);
  const [contact, setContact] = useState();
  console.log(contact);
  useEffect(() => {
    if (user.uid) {
      fetchBackDefaultData(`users/${user.uid}/contacts`, (data) => {
        setContactLinks(data);
      });
    }
  }, [user.uid]);
  const handleInputChange = (id: string, value: string) => {
    setContactLinks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserData(`${user.uid}/contacts`, contactLinks);
    setNotification((prev) => ({...prev, isUpdate: true}));
    setTimeout(() => {
      setNotification((prev) => ({...prev, isUpdate: false}));
    }, 4000);
  };
  return (
    <div className='contacts'>
      {notification.isUpdate && (
        <PopupMessage
          title={notification.title}
          messageType={notification.messageType}
        />
      )}
      <div className='contacts__container'>
        <p className='contacts__title'>Contacts</p>
        <p className='contacts__desc'>
          Links will be displayed on your profile.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='contacts__box'>
            {contactLink.map((item, i) => (
              <div key={i} className='contacts__item'>
                <ContactsInput
                  inputValue={contactLinks[item.id] || ''}
                  item={item}
                  currentValue={(value) => handleInputChange(item.id, value)}
                />
              </div>
            ))}
          </div>
          <button className='button-dark contacts__button'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
