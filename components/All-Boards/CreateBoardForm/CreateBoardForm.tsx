'use client';
import Image from 'next/image';
import {FC, use, useEffect, useState} from 'react';
import VisibilityBoard from './VisibilityBoard/VisibilityBoard';
import './CreateBoardForm.scss';
import {v4 as uuidv4} from 'uuid';
import firebaseApp from '@/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getDatabase, onValue, push, ref, set, update} from 'firebase/database';
import {updateUserData} from '@/helper/updateUserData';
import BackgroundCard from './BackgroundBoard/BackgroundBoard';
import {bg_cards} from '@/variables/default';
import {getBoards} from '@/store/board/actions';
import Popup from '@/components/Popup/Popup';

interface CreateABoardProps {
  isCreated: (value: boolean) => void;
}

const CreateBoardForm: FC<CreateABoardProps> = ({isCreated}) => {
  const [currentBg, setCurrentBg] = useState<string>(
    'https://images.unsplash.com/photo-1710032983278-10fc4f0191f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEwMjQ1MDkyfA&ixlib=rb-4.0.3&q=80&w=400',
  );
  const [value, setValue] = useState<string>('');
  const [visibility, setVisibility] = useState('');
  const [boards, setBoards] = useState<any>({});

  const [isUpdate, setIsUpdate] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentBg(e.currentTarget?.dataset?.url as string);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const [currentIds, setCurrentIds] = useState<any>({});
  const [updateUserBoard, setUpdateUserBoard] = useState(false);

  useEffect(() => {
    if (updateUserBoard && user) {
      updateUserData(user.uid, {
        'current-boards': currentIds,
      });
      isCreated(false);

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
      alert('ВВедите название');
      return;
    }
    setUpdateUserBoard(true);
    const id = uuidv4();

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
      },
    };
    setBoards({...boards, ...newBoard});
    setIsUpdate(true);
    isCreated(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='create-board-form'>
      <Popup title='Create a new board' setIsClose={(e) => setIsOpen(e)}>
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          <VisibilityBoard currentValue={(e) => setVisibility(e)} />
          <div className='w-50 mb-5'>
            <div
              style={{
                margin: '0 auto 50px',
                width: 'max-content',
                padding: '15px',
                backgroundImage: `url(${currentBg})`,
              }}
            >
              <Image
                width={100}
                height={100}
                src='/trello-board-img.svg'
                alt='board'
              ></Image>
            </div>
            <BackgroundCard card={bg_cards} handleClick={handleClick} />
          </div>
          {/* <h2>создать доску</h2> */}

          <button type='submit' className='btn btn-dark'>
            создать доску
          </button>
        </form>
      </Popup>
    </div>
  );
};

export default CreateBoardForm;
