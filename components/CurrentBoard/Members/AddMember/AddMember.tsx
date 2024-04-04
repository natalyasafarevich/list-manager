'use client';
import {FC, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref, update} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {MainPhotoProps, MemberProps, UserStructure} from '@/types/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {
  fetchBackData,
  fetchBackDefaultData,
  getFirebaseData,
} from '@/helper/getFirebaseData';
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
  const [boards, setBoards] = useState<NewMembersProps>();

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
      console.log(newMembers, 'newMembersnewMembers');
      // members: {
      //   [user.uid]: 'admin', // Правильный синтаксис для создания объекта
      // },
      const members = {
        // memberUid: memberUid,
        [memberUid]: role,
        // name: newMembers.public_name,
        // email: newMembers.email,
        // photo: newMembers.mainPhoto,
      };

      setMembers((prev: any) => ({...prev, ...members}));
      setIsNewMember(true);
    }
  }, [newMembers]);

  useEffect(() => {
    user &&
      !isNewMember &&
      fetchBackDefaultData(`/boards/${boardIndex}/members`, setMembers);
    // fetchBackData(user.uid, `boards/${boardIndex}/members`, setMembers);
  }, [user, boardIndex, isNewMember]);
  console.log(memberUid, 'f');

  useEffect(() => {
    if (isNewMember) {
      update(ref(db, `boards/${boardIndex}`), {members: members});

      const currentBoard = {
        [boardIndex]: true, // Правильный синтаксис для создания объекта
      };
      // updateUserData(`boards/${boardIndex}`, {members: members});
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
            // console.log(currentBoard?.members, 'ghjk', uid);
            for (const key in currentBoard?.members) {
              console.log(uid === key);

              // const isMemberInList = currentBoard?.members.some(
              //   (member: any) => member.id === uid,
              // );
              // console.log(isMemberInList);
              if (uid === key) {
                console.log('пользователь уже добавлен');
                return;
              }
              // console.log(data[uid],'ghjk');
              // setMembers(data[uid]);
              setMemberUid(uid);
            }
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
    <div>
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
    </div>
  );
};
export default AddMember;
