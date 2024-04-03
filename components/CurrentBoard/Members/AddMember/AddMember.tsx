'use client';
import {FC, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {MainPhotoProps, MemberProps, UserStructure} from '@/types/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {fetchBackData, getFirebaseData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';

export interface NewMembersProps extends MemberProps {
  public_name: string;
  email: string;
  mainPhoto: MainPhotoProps;
}

const AddMember: FC = () => {
  const [isNewMember, setIsNewMember] = useState(false);
  const [email, setEmail] = useState('');
  const [memberUid, setMemberUid] = useState('');
  const [role, setRole] = useState('member');
  const [members, setMembers] = useState<Array<MemberProps>>([]);
  const [newMembers, setNewMembers] = useState<NewMembersProps>();

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
      const newMember = {
        id: memberUid,
        role: role,
        name: newMembers.public_name,
        email: newMembers.email,
        photo: newMembers.mainPhoto,
      };
      setMembers((prev) => [...prev, newMember]);
      setIsNewMember(true);
    }
  }, [newMembers]);

  useEffect(() => {
    user &&
      !isNewMember &&
      fetchBackData(user.uid, `/boards/${boardIndex}/members`, setMembers);
  }, [user, boardIndex, isNewMember]);
  // const current_board
  useEffect(() => {
    if (isNewMember) {
      updateUserData(`${user.uid}/boards/${boardIndex}`, {members: members});
      updateUserData(`${memberUid}/access-other-boards`, {
        uid: user.uid,
        boardIndex: boardIndex,
      });
      setIsNewMember(false);
    }
  }, [isNewMember]);

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
            setMemberUid(uid);
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
