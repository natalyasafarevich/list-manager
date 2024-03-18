'use client';
import {getIsOpenClSetting} from '@/store/column-setting/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColumnSettings from '../ColumnSettings/ColumnSettings';
import {getColumnInfo, getCurrentColumn} from '@/store/colunm-info/actions';
import {getListIndex} from '../ColumnSettings/ArchiveColumn/ArchiveColumn';
import {updateUserData} from '@/helper/updateUserData';

interface NameWithSettingsButtonProps {
  name?: string;
  addNewCard: () => void;
  listIndex: number;
  // setIsUpdate: (a: boolean) => void;

  item: any;
  // arr: any;
}

const NameWithSettingsButton: FC<NameWithSettingsButtonProps> = ({
  name,
  addNewCard,
  listIndex,
  item,
}) => {
  const isCreateNewCard = useSelector((state: RootState) => state.cl_setting);
  const [isOpen, setIsOpen] = useState<boolean>(
    isCreateNewCard.isOpen || false,
  );
  // const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [isOspen, setsIsOpen] = useState<boolean>(false);
  // console.log(isCreateNewCard);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // console.log(item);
  }, [item]);
  useEffect(() => {
    if (isOpen) {
      dispatch(getCurrentColumn(item));
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
        cards: item.cards,
      }),
    );
  };
  const board = useSelector((state: RootState) => state.boards);
  const user = useSelector((state: RootState) => state.userdata);

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let index = getListIndex(board.currentBoards.lists, item.id);
    updateUserData(`${user.uid}/boards/${board.index}/lists/${index}`, {
      name: e.currentTarget.value,
    });
  };
  return (
    <div className=''>
      <div className='d-flex align-items-center justify-content-between'>
        <textarea
          defaultValue={name}
          onChange={changeTitle}
          style={{
            border: 'none',
            background: 'transparent',
            resize: 'none',
            width: '70%',
            height: '30px',
            color: 'violet',
          }}
        ></textarea>
        <button className='btn btn-dark' onClick={openMenu}>
          ...
        </button>
      </div>
      <>
        {isOpen && (
          <ColumnSettings
            current_title={name}
            addNewCard={addNewCard}
            setIsOpen={() => setIsOpen(!isOpen)}
            item={item}
          />
        )}
      </>
    </div>
  );
};

export default NameWithSettingsButton;
