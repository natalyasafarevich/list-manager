'use client';
import {FC, createContext, useEffect, useState} from 'react';
import Column from '../Column/Column';
import {updateUserData} from '@/helper/updateUserData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as uuidv4} from 'uuid';
import {getBoardCurrent} from '@/store/board/actions';
import {getFirebaseData} from '@/helper/getFirebaseData';
import CardForm from '../Column/CardForm/CardForm';

interface NewColumnProps {
  currentIndex: number;
}

const ColumnCreator: FC<NewColumnProps> = ({currentIndex}) => {
  // const userd = {name: 'John', email: 'john@example.com'};

  const [value, setValue] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [components, setComponents] = useState<Array<any>>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  const [currentBoard, setCurrentBoard] = useState<any>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardCurrent(currentBoard, currentIndex));
  }, [currentBoard]);

  const user = useSelector((state: RootState) => state.userdata);
  const d = useSelector((state: RootState) => state);
  // console.log(d.column.data, 'fefef');

  useEffect(() => {
    if (isUpdate) {
      updateUserData(`${user.uid}/boards/${currentIndex}`, {
        lists: currentList,
      });
      setIsUpdate(false);
    }
    // console.log(currentList, 'is');
  }, [isUpdate, currentList]);
  const isCopy = useSelector((state: RootState) => state.cl_setting);
  console.log(isCopy);
  useEffect(() => {
    if (userData) {
      setCurrentBoard(userData[currentIndex]);

      if (userData[currentIndex] && userData[currentIndex].lists) {
        setCurrentList(userData[currentIndex].lists);

        setComponents(
          userData[currentIndex].lists.map((item: any) => (
            <Column item={item} name={item.name} key={item.id} />
          )),
        );
      }
    }
  }, [userData, currentIndex]);

  useEffect(() => {
    if (user.uid && isCopy) {
      const fetchData = async () => {
        try {
          const userData = await getFirebaseData(user.uid, '/boards');
          setUserData(userData);
          // console.log(userData, 'uer data');
        } catch (error) {
          alert(error + 'error in new column');
        }
      };
      fetchData();
    }
  }, [user.uid, isCopy]);

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
    } else {
      setIsDisabled(true);
    }
  }, [value]);

  return (
    <CardForm
      components={components}
      addComponents={addComponents}
      setValue={setValue}
      saveComponents={saveComponents}
      isClick={isClick}
      isDisabled={isDisabled}
      value={value}
      setIsClick={setIsClick}
    />
  );
};

export default ColumnCreator;
