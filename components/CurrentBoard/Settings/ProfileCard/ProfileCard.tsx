import firebaseApp from '@/firebase';
import {updateFirebaseData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import './ProfileCard.scss';
import Link from 'next/link';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';
interface UserDataProps {
  photo: string;
  name: string;
  role: string;
  email: string;
  id: string;
}

interface ProfileCardProp {
  userData: UserDataProps;
}
const ProfileCard: FC<ProfileCardProp> = ({userData}) => {
  console.log(userData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.uid);
  const board = useSelector((state: RootState) => state.boards);
  const deleteMember = () => {
    if (userData.role !== 'admin') {
      let access = confirm('Удалить участника?');

      if (access) {
        const {[userData.id]: deletedKey, ...members} =
          board.currentBoards.members;
        updateFirebaseData(`boards/${board.index}`, {members: members});
      }
    } else {
      setIsAdmin(true);
      alert('Вы не можете удалить себя или другого администратора.');
    }
  };
  return (
    <div className='profile-card'>
      <div className='profile-card__content'>
        <div
          className='profile-card__image'
          onClick={() => setIsOpen(true)}
          style={{background: `center/cover no-repeat url(${userData.photo})`}}
        ></div>
        {isOpen && (
          <div className='profile-card__box'>
            <button
              className='profile-card__button button-close'
              onClick={() => setIsOpen(false)}
            ></button>
            <div className='profile-card__row flex'>
              <div
                className='profile-card__image'
                style={{
                  background: `center/cover no-repeat no-repeat url(${userData.photo})`,
                }}
              ></div>
              <p className='profile-card__text'>
                {userData?.email}
                <span>{userData?.role}</span>
              </p>
            </div>
            {userData.id === user && (
              <Link className='profile-card__link' href='/settings/profile'>
                Profile management
              </Link>
            )}
            {userData.role !== 'admin' && (
              <button className='button-dark' onClick={deleteMember}>
                {userData.id === user ? 'Leave the board' : 'delete member'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
