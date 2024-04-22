'use client';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as createId} from 'uuid';
import {updateFirebaseData} from '@/helper/updateUserData';
import {
  deleteList,
  getCheckLists,
  isDeleteList,
  isTaskUpdate,
} from '@/store/check-lists/actions';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {isCardUpdate} from '@/store/card-setting/actions';
import './CheckLists.scss';

const CheckLists: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [value, setValue] = useState('');
  const [checkLists, setCheckLists] = useState<any>({});
  const [checkFBLists, setCheckFBLists] = useState<any>({});
  const user = useSelector((state: RootState) => state.userdata);
  const cardIsUpdate = useSelector(
    (state: RootState) => state.check_lists.isTaskUpdate,
  );
  const user_status = useSelector((state: RootState) => state.userdata);
  const isLoggedIn = !!user_status.uid && user_status.user_status !== 'guest';
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      fetchBackDefaultData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}/check-lists`,
        setCheckFBLists,
      );
      // dispatch(isDeleteList(false));
      // dispatch(isCardUpdate(false));
    }
  }, [user, cardIsUpdate]);

  useEffect(() => {
    if (checkFBLists) {
      if (Object.keys(checkFBLists)?.length > 0) {
        dispatch(isTaskUpdate(false));
        setCheckLists(checkFBLists);
        dispatch(getCheckLists(checkFBLists));
      }
    } else {
      setCheckLists({});
    }
  }, [checkFBLists]);

  useEffect(() => {
    Object.keys(checkLists).length &&
      updateFirebaseData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        {
          'check-lists': checkLists,
        },
      );
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    if (Object.keys(checkLists).length > 0) {
      dispatch(getCheckLists(checkLists));
    }
  }, [checkLists]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = createId();
    const newList = {
      [id]: {id: id, title: value},
    };
    if (value.length !== 0) {
      setCheckLists((prev: any) => ({...prev, ...newList}));
      console.log(checkFBLists, checkLists, 'checkFBLists');
      setIsOpen(!isOpen);
      setValue('');
      setIsUpdate(true);
      dispatch(isCardUpdate(true));
    }
  };

  const handelClick = () => {
    if (!isLoggedIn) {
      return;
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className='checklist'>
      <div className='checklist__container '>
        <p className='card-sidebar-title underline' onClick={handelClick}>
          Checklist
        </p>
        {isOpen && (
          <div className='mini-popup-container'>
            <MiniPopup
              title={'Adding a checklist'}
              setIsOpen={(e) => setIsOpen(e)}
            >
              <form onSubmit={handleSubmit}>
                <label className='checklist__label' htmlFor='checklist-name'>
                  Title
                </label>
                <input
                  className='checklist__input default-input'
                  id='checklist-name'
                  type='text'
                  placeholder='Add a checklist name'
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                />
                <button type='submit' className='button-dark checklist__button'>
                  Create a checklist
                </button>
              </form>
            </MiniPopup>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckLists;
