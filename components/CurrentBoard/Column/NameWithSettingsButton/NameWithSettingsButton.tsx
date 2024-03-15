'use client';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnSettings from '../ColumnSettings/ColumnSettings';

interface NameWithSettingsButtonProps {
  name?: string;
}

const NameWithSettingsButton: FC<NameWithSettingsButtonProps> = ({name}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getIsOpenClSetting({isOpen}));
  }, [isOpen]);

  return (
    <div className=''>
      <b>{name}</b>
      <button className='btn btn-dark' onClick={(e) => setIsOpen(!isOpen)}>
        ...
      </button>
      <>{!isOpen && <ColumnSettings setIsOpen={() => setIsOpen(!isOpen)} />}</>
    </div>
  );
};

export default NameWithSettingsButton;
