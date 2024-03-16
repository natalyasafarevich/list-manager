'use client';
import {updateUserData} from '@/helper/updateUserData';
import {
  getIsOpenClSetting,
  isCopyColumn,
  isCreateCard,
} from '@/store/column-setting/actions';
import {getCurrentColumn} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

type SettingsProps = {
  setIsOpen: () => void;
  addNewCard: () => void;
  // setIsUpdate: (a: boolean) => void;
  current_title?: string;
  item: any;
};

const ColumnSettings: FC<SettingsProps> = ({
  setIsOpen,
  addNewCard,
  current_title,
  item,
  // setIsUpdate,
}) => {
  const [isCopy, setIsCopy] = useState(false);
  const [list, getList] = useState<any>([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState('Действия со списком');

  const current_column = useSelector((state: RootState) => state.column.data);

  useEffect(() => {
    isCopy ? setTitle('копирование списка') : setTitle('Действия со списком');
  }, [isCopy]);
  const user = useSelector((state: RootState) => state.userdata);
  const current_board = useSelector((state: RootState) => state.boards);
  // console.log(current_column, 'list');
  useEffect(() => {}, [isUpdate]);
  const d = useSelector((state: RootState) => state.column?.data);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setValue(current_title as string);
  }, [current_title]);
  useEffect(() => {
    // console.log(current_column, 'current_column');
    current_column.cards && getList((prev: any) => [...current_column.cards]);
    // // ;
  }, [current_column?.cards]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdate(true);
    // console.log('isUpdate');
    // !! не обновляется с первого раза
    dispatch(isCopyColumn({isCopy: true}));
    // console.log(value, list, 'dj');
    updateUserData(
      `${user.uid}/boards/${current_board?.index}/lists/${current_board?.currentBoards?.lists?.length}/`,
      {cards: list, id: uuidv4(), name: value},
    );
    // updateUserData(
    //   `${user.uid}/boards/${current_board.index}/lists/${cardIndex}`,
    //   {cards},
    // );
  };
  return (
    <div className='position-absolute z-3 rounded-3 bg-warning-subtle card w-100  top-0 start-100 p-2'>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        {isCopy && (
          <button
            onClick={() => {
              setIsCopy(!isCopy);
            }}
          >
            back
          </button>
        )}
        <span>{title}</span>
        <button type='button' onClick={setIsOpen}>
          x
        </button>

        {/* <b>{name}</b> */}
        {/* <button className='btn btn-dark'>...</button> */}
      </div>

      {!isCopy && (
        <>
          <div className=''>
            <button onClick={addNewCard}>Добавить карточку</button>
          </div>
          <div className=''>
            <br />
            <button
              onClick={() => {
                setIsCopy(!isCopy);
              }}
            >
              копирование списка
            </button>
          </div>
        </>
      )}
      {isCopy && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Название</label>
          <input
            name=''
            id='name'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button type='submit'>save</button>
        </form>
      )}
    </div>
  );
};

export default ColumnSettings;
