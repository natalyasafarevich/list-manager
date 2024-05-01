'use client';
import {FC, useEffect, useState} from 'react';
import './CardSettings.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {getListIndex} from '../../Column/ColumnSettings/ArchiveColumn/ArchiveColumn';
import {ColumnCardsProps} from '@/types/interfaces';
import CommentsAndDesc from './CommentsAndDesc/CommentsAndDesc';
import CardSideBar from '../CardSideBar/CardSideBar';
import CreatedCheckList from './CreatedCheckList/CreatedCheckList';
import {updateFirebaseData} from '@/helper/updateUserData';
import {isCardUpdate} from '@/store/card-setting/actions';

export function getCardIndex(lists: Array<any>, id: string) {
  return lists.findIndex((item) => item.id === id);
}

type CardSettingsProps = {
  card: ColumnCardsProps;
  setIsOpenCard: () => void;
};
export interface CommentProps {
  title: string;
  owner: string;
  id: string;
  createDate: string;
  photoUrl: string;
  name: string;
  editDate?: string;
}
const CardSettings: FC<CardSettingsProps> = ({card, setIsOpenCard}) => {
  const [columnName, setColumnName] = useState<string>('');
  const [allComments, setAllComment] = useState<Array<CommentProps>>([]);
  const [makers, setMarkers] = useState<any>({});

  const current_markers = useSelector(
    (state: RootState) => state.markers.markers,
  );

  useEffect(() => {
    setMarkers(current_markers);
  }, [current_markers]);
  const boardLists = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  const current_column = useSelector((state: RootState) => state?.column.data);

  useEffect(() => {
    if (boardLists) {
      const columnIndex = getListIndex(boardLists, current_column.id);
      setColumnName(boardLists[columnIndex]?.name);
    }
  }, [current_column, card, boardLists, allComments]);

  const closeSetting = () => {
    setIsOpenCard();
  };
  const [value, setValue] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (card.title) {
      setValue(card.title);
    }
  }, [card.title]);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userdata.dataLink);
  const current_user = useSelector((state: RootState) => state.userdata.current_info);

  const isLoggedIn = !!current_user.uid && current_user.user_status !== 'guest';
  useEffect(() => {
    if (value.length !== 0 && !isReadOnly) {
      updateFirebaseData(
        `boards/${user.boardIndex}/lists/${user.listIndex}/cards/${user.cardIndex}`,
        {title: value},
      );
      dispatch(isCardUpdate(true));
    }
  }, [value, isReadOnly]);
  return (
    <div className='card-settings'>
      <div
        className='card-settings__container'
        style={{background: card?.cover}}
      >
        <button
          className='card-settings__button button-close'
          onClick={closeSetting}
        ></button>
        <div className='card-settings__content'>
          {/* <div
              className='card-settings__cover'
              style={{backgroundColor: card.cover}}
            ></div> */}
          <div className='card-settings__row flex'>
            <div>
              <div className='flex'>
                <input
                  className='card-settings__input'
                  id='name-card'
                  type='text'
                  value={value}
                  onChange={(e) => {
                    setIsReadOnly(false);
                    setValue(e.currentTarget.value);
                  }}
                  onFocus={(e) => setIsReadOnly(false)}
                  readOnly={isReadOnly}
                  // disabled={!isLoggedIn}
                  maxLength={50}
                />
                <label
                  className='card-settings__icon'
                  htmlFor='name-card'
                ></label>
              </div>
              <p className='card-settings__column-text'>
                In column: <span> {columnName}</span>
              </p>
            </div>
          </div>
          <div className='card-settings__markers'>
            <span className='card-settings__subtitle'>Markers</span>
            <div className='card-settings__box flex'>
              {Object.keys(makers).map((key, i) => (
                <div
                  key={i}
                  className='card-settings__marker-item default-tags'
                  style={{background: makers[key].color}}
                >
                  {makers[key].text}
                </div>
              ))}
            </div>
          </div>
          <div>
            <CommentsAndDesc card={card}>
              <CreatedCheckList />
            </CommentsAndDesc>
          </div>
        </div>
        <div className='card-settings__menu'>
          <CardSideBar />
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
