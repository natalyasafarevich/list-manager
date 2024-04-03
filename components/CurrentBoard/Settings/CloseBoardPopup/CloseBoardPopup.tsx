'use client';
import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {PayloadProps} from '../../Board';
import {updateUserData} from '@/helper/updateUserData';

interface CloseBoardPopupProps {
  board: PayloadProps;
}

const CloseBoardPopup: FC<CloseBoardPopupProps> = ({board}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const openBoard = () => {
    console.log(board);
    updateUserData(`${user.uid}/boards/${boardIndex}`, {isCloseBoard: false});
  };
  return (
    <div className='bg-light text-dark p-3'>
      <p className='text-center'>
        <b>{board.name}</b> закрыта
        <button onClick={openBoard}>Открыть доску заново</button>
      </p>
    </div>
  );
};

export default CloseBoardPopup;
