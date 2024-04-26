'use client';
import Image from 'next/image';
import {FC, use, useEffect, useState} from 'react';
import VisibilityBoard from '../VisibilityBoard/VisibilityBoard';
import './CreateBoardForm.scss';
import {v4 as uuidv4} from 'uuid';
import firebaseApp from '@/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getDatabase, onValue, push, ref, set, update} from 'firebase/database';
import {updateUserData} from '@/helper/updateUserData';
import BackgroundBoard from '../BackgroundBoard/BackgroundBoard';
import {bg_cards} from '@/variables/default';
import {getBoards} from '@/store/board/actions';
import Popup from '@/components/Popup/Popup';
import {useRouter} from 'next/navigation';

interface CreateBoardFormProps {
  setIsOpen: (value: boolean) => void;

  isClose?: boolean;
  isCreated?: (value: boolean) => void;
}

const CreateBoardForm: FC<CreateBoardFormProps> = ({
  isCreated,
  isClose,
  setIsOpen,
}) => {
  const [currentBg, setCurrentBg] = useState<string>(bg_cards[0].url);
  const [currentIds, setCurrentIds] = useState<any>({});
  const [updateUserBoard, setUpdateUserBoard] = useState(false);
  const [value, setValue] = useState<string>('');
  const [visibility, setVisibility] = useState('');
  const [boards, setBoards] = useState<any>({});

  const [isUpdate, setIsUpdate] = useState(false);
  const user = useSelector((state: RootState) => state.userdata.current_info);

  const router = useRouter();
  const db = getDatabase(firebaseApp);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      const starCountRef = ref(db, `users/${user.uid}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        if (data && data.boards) {
          setBoards(data?.boards);
        }
      });
    }
  }, [user.uid]);

  useEffect(() => {
    if (isUpdate) {
      update(ref(db, '/'), {boards: boards});
      dispatch(getBoards(boards));
      setIsUpdate(false);
    }
  }, [isUpdate]);

  const handleClick = (e: string) => {
    setCurrentBg(e);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (updateUserBoard && user) {
      updateUserData(user.uid, {
        'current-boards': currentIds,
      });
      isCreated && isCreated(false);

      setUpdateUserBoard(false);
    }
  }, [updateUserBoard]);
  useEffect(() => {
    if (user) {
      const boards = ref(db, `users/${user.uid}/current-boards/`);
      onValue(boards, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setCurrentIds((prevData: any) => ({...prevData, ...data}));
        }
      });
      const starCountRef = ref(db, `boards/`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBoards(data);
        }
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length === 0) {
      return;
    }
    setUpdateUserBoard(true);
    const id = uuidv4();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;

    setCurrentIds((prev: any) => ({...prev, [id]: true}));
    const newBoard = {
      [id]: {
        owner: user.uid,
        id: id,
        name: value,
        type: visibility,
        currentBg: currentBg,
        members: {
          [user.uid]: 'admin',
        },
        creationDate: `${currentDay}.${currentMonth}.${currentYear}`,
      },
    };
    setBoards({...boards, ...newBoard});

    setIsUpdate(true);
    isCreated && isCreated(true);
    router.push(`/board/${newBoard[id].id}`);
  };
  return (
    <>
      {isClose && (
        <div className='create-board-form'>
          <Popup title='Create a new board' setIsClose={(e) => setIsOpen(e)}>
            <form onSubmit={handleSubmit}>
              <div className='create-board-form__box'>
                <p className='create-board-form__label'>
                  Background
                  <span>*You can change it after creating the board</span>
                </p>
                <BackgroundBoard card={bg_cards} handleClick={handleClick} />
              </div>
              <div className='create-board-form__box'>
                <label htmlFor='title' className='create-board-form__label'>
                  Title
                </label>
                <input
                  className='create-board-form__input'
                  type='text'
                  id='title'
                  value={value}
                  onChange={handleChange}
                  required
                />
              </div>
              <VisibilityBoard currentValue={(e) => setVisibility(e)} />
              <button
                type='submit'
                className='create-board-form__button button-dark'
              >
                Create board
              </button>
            </form>
          </Popup>
        </div>
      )}
    </>
  );
};

export default CreateBoardForm;
