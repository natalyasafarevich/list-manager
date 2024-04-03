import {FC, useEffect, useState} from 'react';
import {PayloadProps as BoardProps} from '../../Board';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateUserData} from '@/helper/updateUserData';
import ButtonToFavorites from '@/components/ButtonToFavorites/ButtonToFavorites';
import ProfileCard from '../ProfileCard/ProfileCard';
import AdditionalMenu from '../../AdditionalMenu/AdditionalMenu';
import {NewMembersProps} from '../../Members/AddMember/AddMember';

interface HeaderBoardProps {
  board: BoardProps;
}

const BoardHeader: FC<HeaderBoardProps> = ({board}) => {
  const [value, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [members, setMembers] = useState<Array<any>>([]);
  console.log(members);
  const boardsIndex = useSelector((state: RootState) => state.boards.index);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  useEffect(() => {
    if (currentBoard?.members) {
      setMembers((prev) => [...(currentBoard?.members?.slice(1) || [])]);
    }
  }, [currentBoard]);

  useEffect(() => {
    setValue(board.name);
  }, [board.name]);

  const user = useSelector((state: RootState) => state.userdata);
  const {uid} = user;

  useEffect(() => {
    isUpdate && updateUserData(`${uid}/boards/${boardsIndex}`, {name: value});
    setIsUpdate(false);
  }, [value, isUpdate]);

  const changeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    setValue(currentTarget.value);
    setIsUpdate(true);
  };

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenMember, setIsOpenMember] = useState(false);

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
                <div
                  onClick={() => setIsOpenMember(!isOpenMember)}
                  style={{
                    background: `center/cover no-repeat url(${member?.photo.url})`,
                    width: 50,
                    height: 50,
                  }}
                ></div>

                {isOpenMember && (
                  <div className='position-absolute bg-light p-3 w-100 text-dark'>
                    <button onClick={() => setIsOpenMember(!isOpenMember)}>
                      close
                    </button>
                    <div className='d-flex'>
                      <img src={member.photo.url || ''} alt='user' />
                      <div className='m-2'>
                        <p className=''>{member.email}</p>
                        <span>{member?.name}</span>
                        <hr />
                        <span>{member?.role}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className='m-2' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              боковое меню
            </button>

            {isOpenCard && (
              <div className='position-absolute bg-light p-3 w-100 text-dark'>
                <ProfileCard setIsOpen={(e) => setIsOpenCard(e)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardHeader;
