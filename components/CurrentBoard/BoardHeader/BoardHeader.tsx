import {FC, useEffect, useState} from 'react';
import {PayloadProps as BoardProps} from '../Board';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateUserData} from '@/helper/updateUserData';
import ButtonToFavorites from '@/components/ButtonToFavorites/ButtonToFavorites';
import ProfileCard from '../ProfileCard/ProfileCard';
import AdditionalMenu from '../AdditionalMenu/AdditionalMenu';

interface HeaderBoardProps {
  board: BoardProps;
}

const BoardHeader: FC<HeaderBoardProps> = ({board}) => {
  const [value, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const boardsIndex = useSelector((state: RootState) => state.boards.index);
  useEffect(() => {
    setValue(board.name);
  }, [board.name]);
  const user = useSelector((state: RootState) => state.userdata);
  const {uid} = user;
  console.log(user);
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

  return (
    <>
      <AdditionalMenu />
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
              onClick={(e) => setIsOpenCard(!isOpenCard)}
              style={{
                background: `center/cover no-repeat url(${user?.photoURL})`,
                width: 50,
                height: 50,
              }}
            ></div>
            <button className='m-2'>боковое меню</button>

            {isOpenCard && (
              <div className='position-absolute bg-light p-3 w-100 text-dark'>
                {' '}
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
