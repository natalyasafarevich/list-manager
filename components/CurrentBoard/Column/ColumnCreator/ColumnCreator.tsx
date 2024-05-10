'use client';
import {FC, createContext, useEffect, useState} from 'react';
import Column from '../Column';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {v4 as uuidv4} from 'uuid';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import ColumnCreatorForm from '../ColumnCreatorForm/ColumnCreatorForm';
import {
  isCardCreate,
  isCardUpdate,
  isCover,
  isDescriptionAdded,
} from '@/store/card-setting/actions';

interface NewColumnProps {
  currentIndex: number;
}

const ColumnCreator: FC<NewColumnProps> = ({currentIndex}) => {
  // console.log('l');
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [components, setComponents] = useState<Array<any>>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  // const [currentBoard, setCurrentBoard] = useState<any>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.userdata);
  const isCopy = useSelector((state: RootState) => state.cl_setting);
  const isCreate = useSelector((d: RootState) => d.card_setting);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      updateFirebaseData(`boards/${currentIndex}`, {
        lists: currentList,
      });
      setIsUpdate(false);
    }
  }, [isUpdate, currentList]);
  // console.log('jm');
  useEffect(() => {
    if (userData) {
      // setCurrentBoard(userData[currentIndex]);
      if (userData[currentIndex] && userData[currentIndex].lists) {
        setCurrentList(userData[currentIndex].lists);
        setComponents(
          userData[currentIndex]?.lists?.map((item: any) => (
            <Column item={item} name={item.name} key={item.id} />
          )),
        );
      }
    }
  }, [userData, currentIndex]);
  // console.log(userData, currentIndex);
  const current_markers = useSelector(
    (state: RootState) => state.markers.markers,
  );
  // const updateCover = useSelector(
  //   (state: RootState) => state.card_setting.isCover,
  // );
  useEffect(() => {
    fetchBackDefaultData('/boards', setUserData);
  }, []);
  const cardUpdate = useSelector(
    (state: RootState) => state.card_setting.isUpdate,
  );
  useEffect(() => {
    if (user.uid || cardUpdate) {
      fetchBackDefaultData('/boards', setUserData);
      dispatch(isCardUpdate(false));
      // dispatch(isCardCreate({isCardCreate: false}));
      // dispatch(isDescriptionAdded(false));
      // dispatch(isCover(false));
    }
  }, [
    cardUpdate,
    // updateCover,
    user.uid,
    // isCopy.isCopy,
    // isCreate.isDescriptionAdded,
    // isCreate.isCardCreate,
    current_markers,
  ]);

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
