'use client';
import {getIsOpenClSetting, isCreateCard} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type SettingsProps = {
  setIsOpen: () => void;
  addNewCard: () => void;
};

const ColumnSettings: FC<SettingsProps> = ({setIsOpen, addNewCard}) => {
  const [isCopy, setIsCopy] = useState(false);
  const [title, setTitle] = useState('Действия со списком');
  const isOpen = useSelector((state: RootState) => state.cl_setting);

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
      {isCopy && <div>{/* <span>Копирование списка</span> */}</div>}
    </div>
  );
};

export default ColumnSettings;
