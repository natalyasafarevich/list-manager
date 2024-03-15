'use client';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnSettings from '../ColumnSettings/ColumnSettings';

interface NameWithSettingsButtonProps {
  name?: string;
  addNewCard: () => void;
}

const NameWithSettingsButton: FC<NameWithSettingsButtonProps> = ({
  name,
  addNewCard,
}) => {
  const isCreateNewCard = useSelector((state: RootState) => state.cl_setting);

  const [isOpen, setIsOpen] = useState<boolean>(
    isCreateNewCard.isOpen || false,
  );
  const [isOspen, setsIsOpen] = useState<boolean>(false);
  console.log(isCreateNewCard);
  const dispatch: AppDispatch = useDispatch();
  //
  useEffect(() => {
    if (isOpen) {
      dispatch(getIsOpenClSetting({isOpen: true}));
      setsIsOpen(true);
      return;
    }
    dispatch(getIsOpenClSetting({isOpen: false}));
    setsIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    // console.log(isCreateNewCard.isCreate);
    // isCreateNewCard.isOpen ? setIsOpen(false) : setIsOpen(true);
  }, [isCreateNewCard.isOpen]);
  return (
    <div className=''>
      <b>{name}</b>
      <button className='btn btn-dark' onClick={(e) => setIsOpen(!isOpen)}>
        ...
      </button>
      <>
        {isOpen && (
          <ColumnSettings
            addNewCard={addNewCard}
            setIsOpen={() => setIsOpen(!isOpen)}
          />
        )}
      </>
    </div>
  );
};

export default NameWithSettingsButton;
