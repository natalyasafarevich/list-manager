'use client';

import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnSettings from '../ColumnSettings/ColumnSettings';
import {getColumnInfo, getCurrentColumn} from '@/store/colunm-info/actions';
import {getListIndex} from '../ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateFirebaseData} from '@/helper/updateUserData';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import './ColumnHeader.scss';

interface NameWithSettingsButtonProps {
  addNewCard: () => void;
  listIndex: number;
  item: any;
  name?: string;
}

const ColumnHeader: FC<NameWithSettingsButtonProps> = ({
  name,
  addNewCard,
  item,
}) => {
  const isCreateNewCard = useSelector((state: RootState) => state.cl_setting);
  const isUpdate = useSelector(
    (state: RootState) => state.card_setting.isUpdate,
  );

  const [isOpen, setIsOpen] = useState<boolean>(
    isCreateNewCard.isOpen || false,
  );
  const [textareaName, setTexareaName] = useState('');
  useEffect(() => {
    name && setTexareaName(name);
  }, [name]);
  const board = useSelector((state: RootState) => state.boards);
  const user = useSelector((state: RootState) => state.userdata.current_info);

  const isLoggedIn = useMemo(
    () => !!user.uid && user.user_status !== 'guest',
    [user],
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(getCurrentColumn(item));
      dispatch(getIsOpenClSetting({isOpen: true}));
    } else {
      dispatch(getIsOpenClSetting({isOpen: false}));
    }
  }, [isOpen, dispatch, item, isUpdate]);

  const openMenu = () => {
    setIsOpen(!isOpen);
    dispatch(
      getColumnInfo({
        id: item.id,
        cards: item.cards,
      }),
    );
  };

  return (
    <div className='column-header'>
      <div className='column-header__container'>
        <div className='column-header__row flex'>
          <div className='column-header__textarea'>
            <textarea
              maxLength={25}
              defaultValue={textareaName}
              readOnly
            ></textarea>
          </div>
          {isLoggedIn && (
            <button
              className={`column-header__button ${isOpen ? 'active' : ''}`}
              onClick={openMenu}
            ></button>
          )}
        </div>
      </div>
      <>
        {isOpen && (
          <div className='column-header__settings'>
            <ColumnSettings
              current_title={name}
              addNewCard={addNewCard}
              setIsOpen={() => setIsOpen(!isOpen)}
              item={item}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default ColumnHeader;
