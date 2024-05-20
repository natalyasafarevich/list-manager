'use client';
import {fetchBackDefaultData, getFirebaseData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isArchive} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ArchivedСolumns.scss';

export const fetchData = async (id: string, index: number, getUserData: (a: any) => void) => {
  try {
    const columnData = await getFirebaseData(id, `/boards/${index}/lists/`);
    getUserData(columnData);
  } catch (error) {
    // alert(error + 'error in new column');
  }
};
// fetchData();
const ArchivedСolumns: FC = () => {
  const [allColumns, getAllColumns] = useState<Array<any>>([]);
  const [archivedColumns, getArchivedColumns] = useState<Array<any>>([]);

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);
  const isArchived = useSelector((state: RootState) => state?.markers.isCardArchived);
  useEffect(() => {
    fetchBackDefaultData(`boards/${current_board.index}/lists`, getAllColumns);
  }, [user, current_board, isArchived]);

  useEffect(() => {
    if (allColumns !== null && allColumns.length) {
      let archived = allColumns?.filter((item) => item?.isArchive === true);
      getArchivedColumns(archived);
    }
  }, [allColumns]);

  const returnToBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    // console.log(<allColumns></allColumns>);
    for (let key in allColumns) {
      if (key === id) {
        // updateFirebaseData(`boards/${boardIndex}/lists/${i}`, {
        //   isArchive: false,
        // });
        // dispatch(isArchive({isArchive: false}));
      }
    }
    allColumns.map((item, i) => {
      if (item.id === id) {
        updateFirebaseData(`boards/${boardIndex}/lists/${i}`, {
          isArchive: false,
        });
        dispatch(isArchive({isArchive: false}));
      }
    });
  };
  const boardIndex = useSelector((state: RootState) => state?.boards.index);
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <div className='archived'>
      <p className='additional-menu__subtitle'>Archived Lists:</p>
      <div className='archived__content'>
        {archivedColumns?.map((column, i) => (
          <div className='archived__box' key={i}>
            <p className='archived__title'>{column.name}</p>
            {isLoggedIn && (
              <button data-id={column.id} className='archived__button button-dark' onClick={returnToBoard}>
                Return to the board
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedСolumns;
