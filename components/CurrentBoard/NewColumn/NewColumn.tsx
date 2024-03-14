'use client';
import {FC, useEffect, useState} from 'react';
import Column from '../Column/Column';
import {updateUserData} from '@/helper/updateUserData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as uuidv4} from 'uuid';
import {getBoardCurrent} from '@/store/board/actions';
import {getFirebaseData} from '@/helper/getFirebaseData';

interface NewColumnProps {
  currentIndex: number;
}
const NewColumn: FC<NewColumnProps> = ({currentIndex}) => {
  const dispatch: AppDispatch = useDispatch();

  const [value, setValue] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [components, setComponents] = useState<Array<any>>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  const [currentBoard, setCurrentBoard] = useState<any>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getBoardCurrent(currentBoard, currentIndex));
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
    if (userData) {
      setCurrentBoard(userData[currentIndex]);
      if (userData[currentIndex] && userData[currentIndex].lists) {
        setCurrentList(userData[currentIndex].lists);

        setComponents(
          userData[currentIndex].lists.map((item: any) => (
            <Column dataId={item.id} key={item.id} name={item.name} />
          )),
        );
      }
    }
  }, [userData, currentIndex]);

  useEffect(() => {
    if (user.uid) {
      const fetchData = async () => {
        try {
          const userData = await getFirebaseData(user.uid, '/boards');
          setUserData(userData);
        } catch (error) {
          alert(error + 'error in new column');
        }
      };
      fetchData();
    }
  }, [user.uid]);

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
