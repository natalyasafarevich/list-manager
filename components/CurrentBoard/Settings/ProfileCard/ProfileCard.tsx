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
  // setIsOpen?: (value: boolean) => void;
  userData: any;
}
const ProfileCard: FC<ProfileCardProp> = ({userData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.uid);
  // ({
  //   public_name: '',
  //   photoURL: {
  //     url: '',
  //     name: '',
  //   },
  // });
  // const user = useSelector((state: RootState) => state.userdata);
  // const db = getDatabase(firebaseApp);

  // useEffect(() => {
  //   if (user.uid) {
  //     const starCountRef = ref(db, 'users/' + user.uid);
  //     onValue(starCountRef, (snapshot) => {
  //       const data = snapshot.val();
  //       if (data) {
  //         setUserData({
  //           public_name: data.public_name || '',
  //           photoURL: data?.mainPhoto,
  //         });
  //       }
  //     });
  //   }
  // }, [user.uid]);
  return (
    <div className=''>
      <img
        onClick={() => setIsOpen(true)}
        src={userData.photo || ''}
        alt='user'
      />
      {isOpen && <button onClick={() => setIsOpen(false)}>close</button>}
      {isOpen && (
        <div className='position-absolute bg-light p-3 w-100 text-dark'>
          <div className='d-flex'>
            <img src={userData?.photo || ''} alt='user' />
            <div className='m-2'>
              <p className=''>{userData?.email}</p>
              <span>{userData?.name}</span>
              <span>{userData?.role}</span>
            </div>
          </div>
          {/* {userData.role==='admin' && } */}
          {userData.id === user && (
            <Link href='/settings/profile'>управление профилем</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
