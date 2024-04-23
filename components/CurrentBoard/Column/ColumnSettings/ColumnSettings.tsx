'use client';

import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CopyColumn from './CopyColumn/CopyColumn';
import {ColumnCardsProps} from '@/types/interfaces';
import ArchiveColumn from './ArchiveColumn/ArchiveColumn';
import './ColumnSettings.scss';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import EditTitle from './EditTitle/EditTitle';

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
  const [title, setTitle] = useState('Options');
  const current_column = useSelector((state: RootState) => state.column.data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setValue(current_title as string);
  }, [current_title]);

  useEffect(() => {
    current_column.cards && getCards((prev: any) => [...current_column.cards]);
  }, [current_column.cards]);
  const addNewCardLocal = () => {
    addNewCard();
    setIsOpen();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <div className='column-settings'>
      <div className='column-settings__container'>
        <MiniPopup title='' setIsOpen={setIsOpen}>
          <div className='column-settings__row flex'>
            <p className='column-settings__title'>{title}</p>
          </div>
          <div className='column-settings__content'>
            <div className='column-settings__box'>
              <p
                className='column-settings__item icon icon-edit'
                onClick={(e) => setIsEdit(!isEdit)}
              >
                Edit
              </p>

              {isEdit && (
                <div className='column-settings__popup'>
                  <EditTitle setIsOpen={(e) => setIsEdit(e)} />
                </div>
              )}
            </div>
            <p
              className='column-settings__item icon icon-plus'
              onClick={addNewCardLocal}
            >
              Add a new card
            </p>
            <p
              className='column-settings__item icon icon-copy'
              onClick={() => {
                setIsCopy(!isCopy);
              }}
            >
              Copy column
            </p>
            {isCopy && (
              <CopyColumn
                setCloseMenu={(e) => setIsOpen()}
                setIsOpen={(e) => setIsCopy(e)}
                value={value}
                setValue={(e) => setValue(e)}
              />
            )}
            <ArchiveColumn />
          </div>
        </MiniPopup>
      </div>
    </div>
  );
};

export default ColumnSettings;
