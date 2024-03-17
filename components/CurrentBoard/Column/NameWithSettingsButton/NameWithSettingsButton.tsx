'use client';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnSettings from '../ColumnSettings/ColumnSettings';
import {getColumnInfo} from '@/store/colunm-info/actions';

interface NameWithSettingsButtonProps {
  name?: string;
  addNewCard: () => void;
  // setIsUpdate: (a: boolean) => void;

  item: any;
  // arr: any;
}

const NameWithSettingsButton: FC<NameWithSettingsButtonProps> = ({
  name,
  addNewCard,
  // setIsUpdate,
  item,
}) => {
  const isCreateNewCard = useSelector((state: RootState) => state.cl_setting);
  // const d = useSelector((state: RootState) => state.boards.currentBoards.lists);
  const [isOpen, setIsOpen] = useState<boolean>(
    isCreateNewCard.isOpen || false,
  );
  // const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [isOspen, setsIsOpen] = useState<boolean>(false);
  // console.log(isCreateNewCard);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // console.log(item.id);
  }, [item]);
  useEffect(() => {
    if (isOpen) {
      // dispatch(getCurrentColumn(item));
      dispatch(getIsOpenClSetting({isOpen: true}));
      setsIsOpen(true);
      return;
    }
    dispatch(getIsOpenClSetting({isOpen: false}));
    setsIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const openMenu = () => {
    setIsOpen(!isOpen);
    dispatch(
      getColumnInfo({
        id: item.id,
        // cards: userData.cards,
      }),
    );
  };
  return (
    <div className=''>
      <b>{name}</b>
      <button className='btn btn-dark' onClick={openMenu}>
        ...
      </button>
      <>
        {isOpen && (
          <ColumnSettings
            current_title={name}
            addNewCard={addNewCard}
            setIsOpen={() => setIsOpen(!isOpen)}
            item={item}
            // setIsUpdate={setIsUpdate}
          />
        )}
      </>
    </div>
  );
};

export default NameWithSettingsButton;
