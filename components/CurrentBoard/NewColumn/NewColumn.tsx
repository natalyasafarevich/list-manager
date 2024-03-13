'use client';
import {FC, useEffect, useState} from 'react';
import Column from '../Column/Column';
import {updateUserData} from '@/helper/updateUserData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';
import {v4 as uuidv4} from 'uuid';
import {getBoardCurrent} from '@/store/board/actions';

interface NewColumnProps {
  currentIndex: number;
}
const NewColumn: FC<NewColumnProps> = ({currentIndex}) => {
  const t = useSelector((state: RootState) => state.column);
  console.log(t);
  const dispatch: AppDispatch = useDispatch();
  const [components, setComponents] = useState<Array<any>>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [currentBoard, setCurrentBoard] = useState<any>({});
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isClick, setIsClick] = useState(false);
  const [currentList, setCurrentList] = useState<any>([]);
  useEffect(() => {
    // dispatch(getBoardCurrent(currentBoard?.lists));
  }, [currentBoard]);
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    if (isUpdate) {
      updateUserData(`${user.uid}/boards/${currentIndex}`, {
        lists: currentList,
      }),
        setIsUpdate(false);
    }
  }, [isUpdate, currentList]);

  useEffect(() => {
    if (user.uid) {
      const db = getDatabase(firebaseApp);
      const starCountRef = ref(db, 'users/' + user.uid + '/boards');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        setCurrentBoard(data[currentIndex]);
        //получение созданных колонок
        if (data[currentIndex] && data[currentIndex].lists) {
          setCurrentList(data[currentIndex].lists);

          setComponents(
            data[currentIndex].lists.map((item: any) => (
              <Column
                // currentId={currentBoard.id}
                key={item.id}
                name={item.name}
              />
            )),
          );
        }
      });
    }
  }, [user.uid, currentIndex]);

  // console.log(currentList);
  const addComponents = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComponents = [
      ...components,
      <Column name={value} key={uuidv4()} />,
    ];

    setComponents(newComponents);
    setCurrentList((prev: any) => [
      ...prev,
      {
        id: uuidv4(),
        name: value,
      },
    ]);
    setIsUpdate(true);
    setValue('');
    setIsDisabled(true);
    setIsClick(false);
  };

  const saveComponents = () => {
    setIsClick(true);
  };

  useEffect(() => {
    if (value.length >= 1) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [value]);
  return (
    <div className='d-flex align-items-start'>
      {components.map((component, i) => (
        <div
          style={{minWidth: '280px', maxWidth: '280px', width: '100%'}}
          key={i}
        >
          {component}
        </div>
      ))}
      <div className='d-block btn-outline-primary__'>
        {isClick ? (
          <form
            onSubmit={addComponents}
            className='border p-3 border-dark rounded'
          >
            <input
              type='text'
              placeholder='name of task'
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button
              className='btn btn-outline-secondary d-block mt-2'
              type='submit'
              disabled={isDisabled}
            >
              save
            </button>
            <button
              onClick={(e) => {
                setIsClick(false), setValue('');
              }}
            >
              close
            </button>
          </form>
        ) : (
          <button onClick={saveComponents} className='btn btn-outline-primary'>
            создать список
          </button>
        )}
      </div>
    </div>
  );
};

export default NewColumn;
