'use client';
import {FC, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref, update} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {MainPhotoProps, MemberProps, UserStructure} from '@/types/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';

export interface NewMembersProps extends MemberProps {
  public_name: string;
  email: string;
  mainPhoto: MainPhotoProps;
}

const AddMember: FC = () => {
  const [isNewMember, setIsNewMember] = useState(false);
  const [email, setEmail] = useState('natalyasafarevich@gmail.com');
  const [memberUid, setMemberUid] = useState('');
  const [role, setRole] = useState('member');
  const [members, setMembers] = useState<any>({});
  const [newMembers, setNewMembers] = useState<NewMembersProps>();
  // const [boards, setBoards] = useState<NewMembersProps>();

  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const user = useSelector((state: RootState) => state.userdata);

  const db = getDatabase(firebaseApp);

  useEffect(() => {
    if (memberUid) {
      fetchBackData(memberUid, ``, setNewMembers);
    }
  }, [memberUid]);

  useEffect(() => {
    if (newMembers) {
      const members = {
        [memberUid]: role,
      };

      setMembers((prev: any) => ({...prev, ...members}));
      setIsNewMember(true);
    }
  }, [newMembers]);
  const [notification, setNotification] = useState<any>({});
  useEffect(() => {
    user &&
      !isNewMember &&
      fetchBackDefaultData(`/boards/${boardIndex}/members`, setMembers);
  }, [user, boardIndex, isNewMember]);
  // console.log(notification, '  console.log(notification);');
  const [isUpdate, setIsUpdate] = useState(false);
  // const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    // memberUid && console.log();
  }, [memberUid]);
  useEffect(() => {
    if (isUpdate && memberUid && notification.length) {
      updateUserData(`${memberUid}/`, {notification: notification});

      fetchBackDefaultData(`users/${memberUid}/notification`, setNotification);
      setIsUpdate(false);
    }
  }, [isUpdate, memberUid, notification]);

  useEffect(() => {
    if (isNewMember) {
      update(ref(db, `boards/${boardIndex}`), {members: members});

      const currentBoard = {
        [boardIndex]: true, // Правильный синтаксис для создания объекта
      };
      updateUserData(`${memberUid}/current-boards`, currentBoard);
      setIsNewMember(false);
    }
  }, [isNewMember]);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  // useEffect(() => {
  //   currentBoard.members && setMembers(currentBoard.members);
  // }, [currentBoard]);
  const addNewMember = () => {
    if (email) {
      const starCountRef = query(ref(db, 'users/'));
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (const uid in data) {
          if (data[uid].email === email) {
            for (const key in currentBoard?.members) {
              if (uid === key) {
                console.log('user exist');
                setIsUpdate(false);
                return;
              } else {
                // const notification = {
                //   id: id,
                //   message: `пользователь ${user.email} добавил вас на доску `,
                //   isViewed: false,
                //   name: currentBoard.name,
                //   link: currentBoard.id,
                // };
                setNotification((prevNotification: any) => {
                  const id = createId();
                  const newNotification = {
                    id: id,
                    message: `пользователь ${user.email} добавил вас на доску `,
                    isViewed: false,
                    name: currentBoard.name,
                    link: currentBoard.id,
                  };
                  return {...prevNotification, [id]: newNotification};
                });

                setIsUpdate(true);
                setMemberUid(uid);
              }
            }
            return;
          }
        }
      });
    }
  };
  const changeRole = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    if (currentTarget.dataset.type) {
      setRole(currentTarget.dataset.type);
    }
  };
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div>
      <input
        type='email'
        placeholder='Введите email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={addNewMember}
        disabled={user_status !== 'admin' ? true : false}
      >
        найти
      </button>
      <div className='d-flex'>
        <b> роль:</b>
        <button data-type='admin' onClick={changeRole}>
          админ
        </button>
        <button data-type='member' onClick={changeRole}>
          участник
        </button>
        <button data-type='guest' onClick={changeRole}>
          гость
        </button>
      </div>
    </div>
  );
};
export default AddMember;
