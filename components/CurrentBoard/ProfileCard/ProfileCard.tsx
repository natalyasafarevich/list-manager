import firebaseApp from '@/firebase';
import {RootState} from '@/store/store';
import {getDatabase, onValue, ref} from 'firebase/database';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
interface UserDataProps {
  public_name: string;
  photoURL: {url: string; name: string};
}

interface ProfileCardProp {
  setIsOpen: (value: boolean) => void;
}
const ProfileCard: FC<ProfileCardProp> = ({setIsOpen}) => {
  const [userData, setUserData] = useState<UserDataProps>({
    public_name: '',
    photoURL: {
      url: '',
      name: '',
    },
  });
  const user = useSelector((state: RootState) => state.userdata);
  const db = getDatabase(firebaseApp);

  useEffect(() => {
    if (user.uid) {
      const starCountRef = ref(db, 'users/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData({
            public_name: data.public_name || '',
            photoURL: data?.mainPhoto,
          });
        }
      });
    }
  }, [user.uid]);

  return (
    <div className='position-absolute bg-light p-3 w-100 text-dark'>
      <button onClick={() => setIsOpen(false)}>close</button>
      <div className='d-flex'>
        <img src={userData.photoURL.url || user?.photoURL || ''} alt='user' />
        <div className='m-2'>
          <p className=''>{user.displayName}</p>
          <span>{userData?.public_name}</span>
        </div>
      </div>
      <Link href='/settings/profile'>управление профилем</Link>
    </div>
  );
};

export default ProfileCard;
