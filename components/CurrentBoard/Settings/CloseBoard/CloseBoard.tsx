import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';

const CloseBoard: FC = () => {
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const closeBoard = () => {
    const isClose = confirm('Close the board?');
    if (isClose) {
      updateFirebaseData(`boards/${boardIndex}`, {
        isCloseBoard: isClose,
      });
    }
  };
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div>
      <button
        onClick={closeBoard}
        className='button-dark close-board-button'
        disabled={user_status !== 'admin' ? true : false}
      >
        Close the board
      </button>
    </div>
  );
};

export default CloseBoard;
