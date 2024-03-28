import {FC, useEffect, useState} from 'react';
import {PayloadProps as BoardProps} from '../Board';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateUserData} from '@/helper/updateUserData';
import ButtonToFavorites from '@/components/ButtonToFavorites/ButtonToFavorites';

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

  useEffect(() => {
    isUpdate && updateUserData(`${uid}/boards/${boardsIndex}`, {name: value});
    setIsUpdate(false);
  }, [value, isUpdate]);

  const changeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget} = e;
    setValue(currentTarget.value);
    setIsUpdate(true);
  };
  return (
    <div className='mb-5 bg-black text-bg-danger p-3'>
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
  );
};

export default BoardHeader;
