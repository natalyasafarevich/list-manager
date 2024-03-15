'use client';
import {getIsOpenClSetting, isCreateCard} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type SettingsProps = {
  setIsOpen: () => void;
  addNewCard: () => void;
};

const ColumnSettings: FC<SettingsProps> = ({setIsOpen, addNewCard}) => {
  const isOpen = useSelector((state: RootState) => state.cl_setting);

  const dispatch: AppDispatch = useDispatch();

  // const addNewCard = () => {
  //   console.log(isOpen);
  //   dispatch(isCreateCard({isCreate: true}));
  //   dispatch(getIsOpenClSetting({isOpen: false}));
  // };
  // isCreateCard
  // console.log(isOpen);
  return (
    <div className='position-absolute z-3 rounded-3 bg-warning-subtle card w-100  top-0 start-100 p-2'>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        <span>Действия со списком</span>
        <button type='button' onClick={setIsOpen}>
          x
        </button>
        {/* <b>{name}</b> */}
        {/* <button className='btn btn-dark'>...</button> */}
      </div>
      <div className=''>
        <button onClick={addNewCard}>Добавить карточку</button>
      </div>
    </div>
  );
};

export default ColumnSettings;
