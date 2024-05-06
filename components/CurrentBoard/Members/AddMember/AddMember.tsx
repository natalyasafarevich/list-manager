'use client';
import {FC, FormEvent, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref, update} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {MainPhotoProps, MemberProps, UserStructure} from '@/types/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
import './AddMember.scss';
import {Value} from 'react-quill';

export interface NewMembersProps extends MemberProps {
  public_name: string;
  email: string;
  mainPhoto: MainPhotoProps;
}
interface AddMemberProps {
  setIsOpen: (Value: boolean) => void;
}
const AddMember: FC<AddMemberProps> = ({setIsOpen}) => {
  const [isNewMember, setIsNewMember] = useState(false);
  const [email, setEmail] = useState('');
  const [memberUid, setMemberUid] = useState('');
  const [role, setRole] = useState('member');
  const [members, setMembers] = useState<any>({});
  const [newMembers, setNewMembers] = useState<NewMembersProps>();

  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const user = useSelector((state: RootState) => state.userdata);

  const db = getDatabase(firebaseApp);
  console.log(members);
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
  const [isUpdate, setIsUpdate] = useState(false);

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
        [boardIndex]: true,
      };
      updateUserData(`${memberUid}/current-boards`, currentBoard);
      setIsNewMember(false);
    }
  }, [isNewMember]);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  const [error, setError] = useState('');
  const addNewMember = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      const starCountRef = query(ref(db, 'users/'));
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (const uid in data) {
          if (data[uid].email === email) {
            for (const key in currentBoard?.members) {
              if (uid === key) {
                setError('User has already been  added');
                setIsUpdate(false);
                return;
              } else {
                setError('');
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
                setTimeout(() => {
                  setIsOpen(false);
                }, 1000);
                //
              }
            }
          } else {
            setError('User is not found');
          }
        }
      });
    }
  };
  const changeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    if (currentTarget.checked && currentTarget.dataset.type) {
      setRole(currentTarget.dataset.type);
    }
  };
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div className='adding-members'>
      <form action='' onSubmit={addNewMember}>
        <input
          type='email'
          className='default-input adding-members__input'
          placeholder='Write email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='text-error'>{error}</p>
        <div className='adding-members__info'>
          <p className='adding-members__title '>Role:</p>
          <div className='adding-members__box'>
            <input
              type='radio'
              id='admin'
              className='adding-members__radio'
              data-type='admin'
              name='role'
              onChange={changeRole}
            />

            <label htmlFor='admin' className='adding-members__label'>
              Admin
              <span>The administrator has full access to the board</span>
            </label>
          </div>
          <div className='adding-members__box'>
            <input
              type='radio'
              className='adding-members__radio'
              id='member'
              data-type='member'
              name='role'
              onChange={changeRole}
              defaultChecked
            />
            <label htmlFor='member' className='adding-members__label'>
              Member
              <span>The member can add tasks, comment them</span>
            </label>
          </div>
          <div className='adding-members__box'>
            <input
              type='radio'
              id='guest'
              className='adding-members__radio'
              data-type='guest'
              name='role'
              onChange={changeRole}
            />
            <label htmlFor='guest' className='adding-members__label'>
              Guest
              <span>
                The guest can only view tasks and comments without being able to
                change them or add new items
              </span>
            </label>
          </div>
        </div>
        <button
          className='button-dark adding-members__button'
          disabled={user_status !== 'admin' ? true : false}
        >
          Add
        </button>
      </form>
    </div>
  );
};
export default AddMember;
