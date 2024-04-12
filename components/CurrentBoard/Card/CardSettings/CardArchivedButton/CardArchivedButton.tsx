import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {isArchive} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const CardArchivedButton: FC = () => {
  const [isArchived, setIsArchived] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const {uid, dataLink} = user;

  const isArchiveFB = useSelector(
    (state: RootState) => state.markers.isCardArchived,
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isArchiveFB) {
      setIsArchived(isArchiveFB);
    }
  }, [user.dataLink.cardIndex, isArchiveFB]);

  useEffect(() => {
    if (uid && isUpdate) {
      updateFirebaseData(
        `boards/${dataLink.boardIndex}/lists/${dataLink.listIndex}/cards/${dataLink.cardIndex}`,
        {
          isArchived: isArchived,
        },
      );
      setIsUpdate(false);
      dispatch(isArchive({isArchive: true}));
    }
  }, [uid, isUpdate]);
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  const archivedCard = () => {
    setIsArchived((prev) => !prev);
    setIsUpdate(true);
    dispatch(isArchive({isArchive: true}));
  };
  return (
    <div>
      <button
        onClick={archivedCard}
        // disabled={user_status !== 'admin' ? true : false}
      >
        архивировать
      </button>
    </div>
  );
};

export default CardArchivedButton;
