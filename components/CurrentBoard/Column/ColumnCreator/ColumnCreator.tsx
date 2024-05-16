'use client';
import {FC, createContext, useEffect, useState} from 'react';
import Column from '../Column';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as uuidv4} from 'uuid';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import ColumnCreatorForm from '../ColumnCreatorForm/ColumnCreatorForm';
import {isCardCreate, isCardUpdate, isCover, isDescriptionAdded} from '@/store/card-setting/actions';
import {BoardProps, CurrentColumnProps} from '@/types/interfaces';

interface NewColumnProps {
  currentIndex: number;
}

const ColumnCreator: FC<NewColumnProps> = ({currentIndex}) => {
  const [value, setValue] = useState('');
  const [currentList, setCurrentList] = useState<CurrentColumnProps[]>([]);
  const [boardsData, setBoardsData] = useState<{[key: string]: BoardProps}>({});
  const [components, setComponents] = useState<Array<any>>([]);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.userdata);
  const {markers} = useSelector((state: RootState) => state.markers);
  const cardUpdate = useSelector((state: RootState) => state.card_setting.isUpdate);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      updateFirebaseData(`boards/${currentIndex}`, {
        lists: currentList,
      });
      setIsUpdate(false);
    }
  }, [isUpdate, currentList]);

  useEffect(() => {
    if (boardsData[currentIndex]) {
      if (boardsData[currentIndex] && boardsData[currentIndex]?.lists !== undefined) {
        setCurrentList(boardsData[currentIndex].lists as []);
        setComponents(
          (boardsData[currentIndex]?.lists as [])?.map((item: any) => (
            <Column item={item} name={item?.name} key={item.id} />
          )),
        );
      }
    }
  }, [boardsData, currentIndex]);

  useEffect(() => {
    fetchBackDefaultData('/boards', setBoardsData);
  }, []);

  useEffect(() => {
    if (user.uid || cardUpdate) {
      fetchBackDefaultData('/boards', setBoardsData);
      dispatch(isCardUpdate(false));
    }
  }, [cardUpdate, user.uid, markers]);

  const addComponents = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComponents = [...components, <Column name={value} key={uuidv4()} />];

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
    dispatch(isCardUpdate(true));
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
    <ColumnCreatorForm
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
