'use client';

import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CopyColumn from './CopyColumn/CopyColumn';
import {ColumnCardsProps} from '@/types/interfaces';
import {isArchiveColumn} from '@/store/column-setting/actions';
import ArchiveColumn from './ArchiveColumn/ArchiveColumn';

type SettingsProps = {
  setIsOpen: () => void;
  addNewCard: () => void;
  current_title?: string;
  item: any;
};

const ColumnSettings: FC<SettingsProps> = ({
  setIsOpen,
  addNewCard,
  current_title,
}) => {
  const [isCopy, setIsCopy] = useState(false);
  const [cards, getCards] = useState<Array<ColumnCardsProps>>([]);
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState('Действия со списком');
  const current_column = useSelector((state: RootState) => state.column.data);

  useEffect(() => {
    isCopy ? setTitle('копирование списка') : setTitle('Действия со списком');
  }, [isCopy]);

  useEffect(() => {
    setValue(current_title as string);
  }, [current_title]);
  useEffect(() => {
    current_column.cards && getCards((prev: any) => [...current_column.cards]);
  }, [current_column?.cards]);

  const dispatch: AppDispatch = useDispatch();

  // const archiveColumn = () => {
  //   dispatch(isArchiveColumn({isArchive: true}));
  // };

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
            <br />
            <br />
            <ArchiveColumn />
          </div>
        </>
      )}
      {isCopy && (
        <CopyColumn value={value} list={cards} setValue={(e) => setValue(e)} />
      )}
    </div>
  );
};

export default ColumnSettings;
