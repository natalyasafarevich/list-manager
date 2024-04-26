import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import ButtonToFavorites from '@/components/ButtonToFavorites/ButtonToFavorites';
import ProfileCard from '../ProfileCard/ProfileCard';
import BoardOptionsMenu from '../../BoardOptionsMenu/BoardOptionsMenu';
import {getDatabase, onValue, query, ref} from 'firebase/database';
import firebaseApp from '@/firebase';
import ChangingVisibility from '../ChangingVisibility/ChangingVisibility';
import {getMembers} from '@/store/members/actions';
import './BoardHeader.scss';
import Members from '../../Members/Members';

interface HeaderBoardProps {
  board: any;
}

const BoardHeader: FC<HeaderBoardProps> = ({board}) => {
  const [value, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [members, setMembers] = useState<Array<any>>([]);
  const db = getDatabase(firebaseApp);
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );

  const boardsIndex = useSelector((state: RootState) => state.boards.index);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    members && dispatch(getMembers(members));
  }, [members]);
  useEffect(() => {
    setMembers([]);
    if (currentBoard?.members) {
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
  }, [Object.keys(currentBoard?.members).length]);
  useEffect(() => {
    setValue(board.name);
  }, [board.name]);

  const user = useSelector((state: RootState) => state.userdata.current_info);
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
  const isLoggedIn = !!uid && user_status !== 'guest';

  return (
    <>
      {isMenuOpen && <BoardOptionsMenu closeMenu={(e) => setIsMenuOpen(e)} />}
      <div className='board-header'>
        <div className='board-header__container'>
          <div className='board-header__row flex'>
            <div className='board-header__box  flex'>
              <input
                maxLength={25}
                className='board-header__input'
                value={value}
                onChange={changeTitle}
                disabled={!isLoggedIn}
              />
            </div>
            <div className='board-header__members'>
              <div
                onClick={() => setIsOpenCard(!isOpenCard)}
                style={{
                  background: `center/cover no-repeat url(${user?.photoURL})`,
                }}
              ></div>
              <div
                className={`board-header__users flex ${members.length > 5 ? 'hide' : ''}`}
              >
                {members?.map(
                  (member, i) =>
                    i < 5 && (
                      <div className='board-header__card' key={i}>
                        <ProfileCard userData={member} key={i} />
                      </div>
                    ),
                )}
              </div>
              {members.length > 5 && (
                <div className='board-header__count'>+{members.length - 5}</div>
              )}
              <Members />

              {isLoggedIn && (
                <p
                  className='board-header__menu'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {/* Menu */}
                </p>
              )}
            </div>
          </div>
          <div className='board-header__info flex'>
            {isLoggedIn && (
              <div className='flex'>
                <div
                  className={`board-header__visibility ${isOpenCard ? 'active' : ''}`}
                >
                  <p onClick={(_e) => setIsOpenCard(!isOpenCard)}>
                    {board.type}
                  </p>
                  {isOpenCard && (
                    <div className='board-header__popup'>
                      <ChangingVisibility
                        text='Only collaborators can see this'
                        type='private'
                        name='private'
                      />
                      <ChangingVisibility
                        text='Anyone can see'
                        type='public'
                        name='public'
                      />
                    </div>
                  )}
                </div>
                <div className='board-header__item'>
                  {/* <ButtonToFavorites
                    path={
                      boardsIndex ? `boards/${boardsIndex}/favoriteUid` : ''
                    }
                    isFavorite={
                      (board?.favoriteUid && board?.favoriteUid[user.uid]) ||
                      false
                    }
                  /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardHeader;
