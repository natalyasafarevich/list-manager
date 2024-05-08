import firebaseApp from '@/firebase';
import {updateFirebaseData} from '@/helper/updateUserData';
import {v4 as createId} from 'uuid';
import {RootState} from '@/store/store';
import './ProfileCard.scss';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Popup from '@/components/Popup/Popup';
import {formattedDate} from '@/helper/formattedDate';
import NotificationUpdater from '@/hooks/NotificationUpdater';
interface UserDataProps {
  photo: string;
  name: string;
  role: string;
  email: string;
  id: string;
  publicName: string;
}

interface ProfileCardProp {
  userData: UserDataProps;
}
const ProfileCard: FC<ProfileCardProp> = ({userData}) => {
  const [isClose, setIsClose] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const board = useSelector((state: RootState) => state.boards);

  useEffect(() => {
    if (isDelete) {
      const {[userData.id]: deletedKey, ...members} =
        board.currentBoards.members;
      updateFirebaseData(`boards/${board.index}`, {members: members});
      setIsDelete(false);
    }
  }, [isDelete]);

  const [notification, setNotification] = useState<any>({});
  const [notificationSetting, setNotificationSetting] = useState({
    isAddNotification: false,
    userUid: '',
  });

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );

  const deleteMember = () => {
    const date = formattedDate('en');
    const id = createId();

    setNotificationSetting({
      isAddNotification: true,
      userUid: userData.id,
    });

    setNotification((prevNotification: any) => {
      const newNotification = {
        id: id,
        message: `You have been deleted from board`,
        by: user.additional_info.fullName || user.additional_info.publicName,
        uid: user.uid,
        time: date,
        name: currentBoard.name,
        type: 'deleteBoardMember',
        isViewed: false,
      };
      return {...prevNotification, [id]: newNotification};
    });
    setIsClose(!isClose);
    setIsDelete(true);
  };

  const deletionConfirmation = () => {
    if (userData.role !== 'admin') {
      setIsClose(!isClose);
    }
    // else {
    //   alert('Вы не можете удалить себя или другого администратора.');
    // }
  };

  return (
    <>
      {notificationSetting.isAddNotification && (
        <>
          <NotificationUpdater
            userUid={notificationSetting.userUid}
            isAddNotification={notificationSetting.isAddNotification}
            notification={notification}
          />
        </>
      )}
      {isClose && (
        <div className='profile-card__popup'>
          <Popup
            title={`Delete the ${userData.role} from board?`}
            setIsClose={(e) => setIsClose(e)}
          >
            <div className='profile-card__flex flex'>
              <button className='button-dark' onClick={deleteMember}>
                Yes
              </button>
              <button
                className='button-border'
                onClick={(e) => {
                  setIsClose(!isClose);
                  setIsDelete(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Popup>
        </div>
      )}
      <div className='profile-card'>
        <div className='profile-card__content'>
          <div
            className='profile-card__image'
            onClick={() => setIsOpen(true)}
            style={{
              background: `center/cover no-repeat url(${userData?.photo || '/default-image.svg'})`,
            }}
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
                    background: `center/cover no-repeat no-repeat url(${userData.photo || '/default-image.svg'})`,
                  }}
                ></div>
                <p className='profile-card__text'>
                  {userData.name}
                  <br />@{userData.publicName} <br />
                  {userData?.email}
                  <span>{userData?.role}</span>
                </p>
              </div>
              {userData.id === user.uid && (
                <Link className='profile-card__link' href='/settings/profile'>
                  Profile management
                </Link>
              )}
              {userData.role !== 'admin' && (
                <button className='button-dark' onClick={deletionConfirmation}>
                  {userData.id === user.uid
                    ? 'Leave the board'
                    : 'Delete member'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
