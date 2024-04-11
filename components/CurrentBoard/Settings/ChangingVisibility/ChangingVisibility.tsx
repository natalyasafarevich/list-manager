'use client';
import {updateFirebaseData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

interface ChangingVisibilityProps {
  type: string;
  name: string;
}

const ChangingVisibility: FC<ChangingVisibilityProps> = ({type, name}) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const board = useSelector((state: RootState) => state.boards);
  const changeVisibility = (e: React.MouseEvent<HTMLElement>) => {
    const {currentTarget} = e;
    updateFirebaseData(`boards/${board.index}`, {
      type: currentTarget.dataset.type,
    });
  };
  useEffect(() => {
    if (board.currentBoards.type === type) {
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
  }, [board.currentBoards]);
  return (
    <div className='visibility'>
      <div className={`visibility__box ${isCurrent ? 'active' : ''}`}>
        <button
          className='visibility__button'
          data-type={type}
          type='button'
          onClick={changeVisibility}
        >
          {name}
        </button>
      </div>
      {/* <p data-type={type} onClick={changeVisibility}> */}
      {/* {name} */}
      {/* </p> */}
      {/* </> */}
    </div>
  );
};

export default ChangingVisibility;
