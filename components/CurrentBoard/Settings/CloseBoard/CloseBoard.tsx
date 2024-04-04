import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {useRouter} from 'next/navigation';
import {FC} from 'react';
import {useSelector} from 'react-redux';

const CloseBoard: FC = () => {
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const closeBoard = () => {
    const isClose = confirm('закрыть доску?');
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
        disabled={user_status !== 'admin' ? true : false}
      >
        закрыть доску
      </button>
    </div>
  );
};

export default CloseBoard;
