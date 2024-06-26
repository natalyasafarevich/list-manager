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
import {displayName} from 'react-quill';
import ClickAwayListener from '@/components/ClickAwayListener/ClickAwayListener';
import AboutBoardSection from '../../BoardOptionsMenu/AboutBoardSection/AboutBoardSection';
import BoardView from './BoardView/BoardView';

interface HeaderBoardProps {
  board: any;
}

const BoardHeader: FC<HeaderBoardProps> = ({board}) => {
  const [value, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [members, setMembers] = useState<Array<any>>([]);
  const db = getDatabase(firebaseApp);
  const user_status = useSelector((state: RootState) => state.userdata.user_status);

  const boardsIndex = useSelector((state: RootState) => state.boards.index);
  const currentBoard = useSelector((state: RootState) => state.boards.currentBoards);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    members && dispatch(getMembers(members));
  }, [members]);

  useEffect(() => {
    setMembers([]);
    if (currentBoard?.members) {
      for (let uid in currentBoard.members) {
        const starCountRef = query(ref(db, `users/${uid}/additional-info`));
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMembers((prev) => [
              ...prev,
              {
                photo: data.mainPhoto?.url || '',
                desc: data.aboutYourSelf,
                name: data.fullName,
                publicName: data.publicName,
                position: data.position,
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
  const [title, setTitle] = useState('Menu');
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!uid && user_status !== 'guest';
  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  return (
    <>
      {isMenuOpen && (
        <ClickAwayListener setIsOpen={(e) => setIsMenuOpen(e)}>
          <BoardOptionsMenu closeMenu={(e) => setIsMenuOpen(e)} />
        </ClickAwayListener>
      )}
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
              {/* <ClickAwayListener> */}
              <div className={`board-header__users flex ${members.length > 5 ? 'hide' : ''}`}>
                {members?.map(
                  (member, i) =>
                    i < 5 && (
                      <div className='board-header__card' key={i}>
                        <ProfileCard userData={member} key={i} />
                      </div>
                    ),
                )}
              </div>
              {/* </ClickAwayListener> */}
              {members.length > 5 && <div className='board-header__count'>+{members.length - 5}</div>}
              <Members />

              {/* {isLoggedIn && ( */}
              <p className='board-header__menu' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Menu
              </p>
              {/* Menu */}
              {/* </p>
              {/* )} */}
            </div>
          </div>
          <div className='board-header__info flex'>
            <div className='flex'>
              <div className='board-header__item'>
                <BoardView />
              </div>

              <div className={`board-header__visibility ${isOpenCard ? 'active' : ''}`}>
                <p onClick={(_e) => setIsOpenCard(!isOpenCard)}>{board.type}</p>
                {isLoggedIn && isOpenCard && (
                  <ClickAwayListener setIsOpen={(e) => setIsOpenCard(e)}>
                    <div className='board-header__popup'>
                      <ChangingVisibility text='Only collaborators can see this' type='private' name='private' />
                      <ChangingVisibility text='Anyone can see' type='public' name='public' />
                    </div>
                  </ClickAwayListener>
                )}
              </div>
              <ButtonToFavorites
                path={boardsIndex ? `boards/${boardsIndex}/favoriteUid` : ''}
                isFavorite={(board?.favoriteUid && board?.favoriteUid[user.uid]) || false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardHeader;
