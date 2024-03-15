'use client';
import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';

type SettingsProps = {
  setIsOpen: () => void;
};

const ColumnSettings: FC<SettingsProps> = ({setIsOpen}) => {
  const isOpen = useSelector((state: RootState) => state.cl_setting);

  // console.log(isope);
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
    </div>
  );
};

export default ColumnSettings;
