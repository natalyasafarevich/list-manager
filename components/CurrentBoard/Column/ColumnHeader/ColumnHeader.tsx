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
  name?: string;
  addNewCard: () => void;
  listIndex: number;
  item: any;
}

const ColumnHeader: FC<NameWithSettingsButtonProps> = ({
  name,
  addNewCard,
  item,
}) => {
  const isCreateNewCard = useSelector((state: RootState) => state.cl_setting);
  const [isOpen, setIsOpen] = useState<boolean>(
    isCreateNewCard.isOpen || false,
  );
  const board = useSelector((state: RootState) => state.boards);
  const user = useSelector((state: RootState) => state.userdata);

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
  }, [isOpen, dispatch, item]);

  const openMenu = () => {
    setIsOpen(!isOpen);
    dispatch(
      getColumnInfo({
        id: item.id,
        cards: item.cards,
      }),
    );
  };

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let index = getListIndex(board.currentBoards.lists, item.id);
    updateFirebaseData(`boards/${board.index}/lists/${index}`, {
      name: e.currentTarget.value,
    });
  };

  return (
    <div className='column-header'>
      <div className='column-header__container'>
        <div className='column-header__row flex'>
          <div className='column-header__textarea'>
            <textarea
              maxLength={25}
              defaultValue={name}
              onChange={changeTitle}
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
