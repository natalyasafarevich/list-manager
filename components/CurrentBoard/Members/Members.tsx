'use client';
import {FC, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {MemberProps, UserStructure} from '@/types/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {fetchBackData, getFirebaseData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
interface CurrentUserProps {
  data: UserStructure;
  id: string;
}
const Members: FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');

  const [isNewMember, setIsNewMember] = useState(false);

  const [members, setMembers] = useState<Array<MemberProps>>([]);

  const board = useSelector((state: RootState) => state.boards.currentBoards);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    user &&
      !isNewMember &&
      fetchBackData(user.uid, `/boards/${boardIndex}/members`, setMembers);
  }, [user, boardIndex, isNewMember]);
  useEffect(() => {
    if (isNewMember) {
      updateUserData(`${user.uid}/boards/${boardIndex}`, {members: members});
      setIsNewMember(false);
    }
  }, [isNewMember]);
  const db = getDatabase(firebaseApp);

  const addNewMember = () => {
    if (email) {
      const starCountRef = query(ref(db, 'users/'));
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (const uid in data) {
          if (data[uid].email === email) {
            const isMemberInList = members.some((member) => member.id === uid);
            if (isMemberInList) {
              console.log('пользователь уже добавлен');
              return;
            }

            // setCurrentUser(() => ({data: data[uid], id: uid}));
            const newMember = {
              id: uid,
              role: role,
            };
            setMembers((prev) => [...prev, newMember]);
            setIsNewMember(true);
            return;
          } else {
            alert('польщователь не найден');
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
  return (
    <div className='text-light'>
      <h1>Поиск пользователя по email</h1>
      <div>
        участники:
        {board?.members?.map((item, i) => {
          return (
            <p key={i}>
              {item.role} -{item.id}{' '}
            </p>
          );
        })}
      </div>
      <input
        type='email'
        placeholder='Введите email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addNewMember}>найти</button>

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
      {/* {currentUser && <p>{currentUser.id} - теперь на доску</p>} */}
    </div>
  );
};

export default Members;
