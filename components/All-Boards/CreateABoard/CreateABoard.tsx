'use client';
import Image from 'next/image';
import {FC, use, useEffect, useState} from 'react';
import VisibilityBoard from './VisibilityBoard/VisibilityBoard';
import {profileUpdate} from '@/helper/updateProfile';
import {v4 as uuidv4} from 'uuid';
import firebaseApp from '@/firebase';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getDatabase, onValue, push, ref, set, update} from 'firebase/database';
import {updateUserData} from '@/helper/updateUserData';
import BackgroundCard from './BackgroundBoard/BackgroundBoard';
import {bg_cards} from '@/variables/default';
import {getBoards} from '@/store/board/actions';

const CreateABoard: FC = () => {
  const [currentBg, setCurrentBg] = useState<string>(
    'https://images.unsplash.com/photo-1710032983278-10fc4f0191f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEwMjQ1MDkyfA&ixlib=rb-4.0.3&q=80&w=400',
  );
  const [value, setValue] = useState<string>('');
  const [visibility, setVisibility] = useState('');
  const [boards, setBoards] = useState<Array<any>>([]);
  const [bocards, setBoacrds] = useState<Array<any>>([]);
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
      updateUserData(user.uid, {
        boards,
      });
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length === 0) {
      alert('ВВедите название');
      return;
    }
    const newBoard = {
      id: uuidv4(),
      name: value,
      visibility: visibility,
      currentBg: currentBg,
    };
    setBoards([...boards, newBoard]);
    setIsUpdate(true);
  };

  return (
    <form className='d-block mb-5' onSubmit={handleSubmit}>
      <h2>создать доску</h2>
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

        <div className='mt-4'>
          <label htmlFor='title'>Заголовок доски</label>
          <input type='text' id='title' value={value} onChange={handleChange} />
        </div>
        <p className='text-danger'>Настроить и продумать логику</p>
        <VisibilityBoard currentValue={(e) => setVisibility(e)} />
      </div>
      <button type='submit' className='btn btn-dark'>
        создать доску
      </button>
    </form>
  );
};

export default CreateABoard;
