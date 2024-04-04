import {FC, useEffect, useState} from 'react';
import {PayloadProps as BoardProps} from '../../Board';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import ButtonToFavorites from '@/components/ButtonToFavorites/ButtonToFavorites';
import ProfileCard from '../ProfileCard/ProfileCard';
import AdditionalMenu from '../../AdditionalMenu/AdditionalMenu';
import {NewMembersProps} from '../../Members/AddMember/AddMember';
import {getDatabase, onValue, query, ref} from 'firebase/database';
import firebaseApp from '@/firebase';

interface HeaderBoardProps {
  board: any;
}

const BoardHeader: FC<HeaderBoardProps> = ({board}) => {
  const [value, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [members, setMembers] = useState<Array<any>>([]);
  console.log(members);
  const db = getDatabase(firebaseApp);

  const boardsIndex = useSelector((state: RootState) => state.boards.index);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  useEffect(() => {
    if (currentBoard?.members) {
      setMembers([]);
      for (let uid in currentBoard.members) {
        const starCountRef = query(ref(db, `users/${uid}`));
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMembers((prev) => [
              ...prev,
              {
                photo: data?.mainPhoto?.url || '',
                email: data.email,
                id: uid,
                role: currentBoard.members[uid],
              },
            ]);
          }
        });
      }
    }
  }, [currentBoard?.members]);
  useEffect(() => {
    setValue(board.name);
  }, [board.name]);

  const user = useSelector((state: RootState) => state.userdata);
  const {uid} = user;

  useEffect(() => {
    isUpdate && updateFirebaseData(`/boards/${boardsIndex}`, {name: value});
    setIsUpdate(false);
  }, [value, isUpdate]);

  const changeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    setValue(currentTarget.value);
    setIsUpdate(true);
  };

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen && <AdditionalMenu closeMenu={(e) => setIsMenuOpen(e)} />}
      <div className='mb-5 bg-black text-bg-danger p-3'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <input
              value={value}
              onChange={changeTitle}
              style={{
                background: 'transparent',
                color: 'white',
                border: 'none',
                fontSize: 20,
              }}
            />
            <ButtonToFavorites
              path={`${uid}/boards/${boardsIndex}`}
              isFavorite={board.isFavorite || false}
            />
          </div>
          <div className='d-flex position-relative w-25'>
            <div
              onClick={() => setIsOpenCard(!isOpenCard)}
              style={{
                background: `center/cover no-repeat url(${user?.photoURL})`,
                width: 50,
                height: 50,
              }}
            ></div>
            {members?.map((member, i) => (
              <div key={i}>
                <ProfileCard userData={member} key={i} />
              </div>
            ))}

            <button className='m-2' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              боковое меню
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardHeader;
