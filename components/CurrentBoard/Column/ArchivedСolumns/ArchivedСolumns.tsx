'use client';
import {fetchBackDefaultData, getFirebaseData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isArchive} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
export const fetchData = async (
  id: string,
  index: number,
  getUserData: (a: any) => void,
) => {
  try {
    const columnData = await getFirebaseData(id, `/boards/${index}/lists/`);
    getUserData(columnData);
  } catch (error) {
    alert(error + 'error in new column');
  }
};
// fetchData();
const ArchivedСolumns: FC = () => {
  const [allColumns, getAllColumns] = useState<Array<any>>([]);
  const [archivedColumns, getArchivedColumns] = useState<Array<any>>([]);
  <p>архивированные карточка:</p>;

  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state?.boards);
  const isArchived = useSelector(
    (state: RootState) => state?.markers.isCardArchived,
  );
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
    console.log(allColumns);
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

  return (
    <div className='m-2'>
      <p>архивированные списки:</p>
      {archivedColumns?.map((column, i) => (
        <div className='d-flex' key={i}>
          <p className='d-block'>{column.name}</p>
          <button data-id={column.id} onClick={returnToBoard}>
            вернуть на доску
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArchivedСolumns;
