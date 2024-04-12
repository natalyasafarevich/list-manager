'use client';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isArchive} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {current} from '@reduxjs/toolkit';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function getListIndex(lists: Array<any>, id: string) {
  return lists?.findIndex((item) => item.id === id);
}

const ArchiveColumn: FC = () => {
  const [columnIndex, getColumnIndex] = useState<number>(0);

  const columnId = useSelector((state: RootState) => state.column.data.id);
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state?.boards.index);
  const current_board = useSelector(
    (state: RootState) => state?.boards?.currentBoards,
  );

  useEffect(() => {
    const currentIndex = getListIndex(current_board.lists, columnId);
    getColumnIndex(currentIndex);
  }, [columnId, current_board]);

  const dispatch: AppDispatch = useDispatch();
  const archiveColumn = () => {
    updateFirebaseData(`boards/${boardIndex}/lists/${columnIndex}`, {
      isArchive: true,
    });
    dispatch(isArchive({isArchive: true}));
  };
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div>
      <button
        onClick={archiveColumn}
        // disabled={user_status !== 'admin' ? true : false}
      >
        архивировать список{' '}
      </button>
    </div>
  );
};

export default ArchiveColumn;
