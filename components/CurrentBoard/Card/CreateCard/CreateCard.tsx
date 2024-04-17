'use client';
import {isCardUpdate} from '@/store/card-setting/actions';
import {getCurrentColumn} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import './CreateCard.scss';

type CreateCardProps = {
  setCards: (arr: any) => void;
  setIsSave: (v: boolean) => void;
  setIsClose: (v: boolean) => void;
  listId: string;
  setCardIndex: (v: number) => void;
};

const CreateCard: FC<CreateCardProps> = ({
  setCards,
  setIsSave,
  setIsClose,
  setCardIndex,
  listId,
}) => {
  const [value, setValue] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const current_board = useSelector((state: RootState) => state?.boards);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    current_board.boards[current_board.index]?.lists.map(
      (item: any, i: number) => {
        if (item.id === listId) {
          setCardIndex(i);
          dispatch(getCurrentColumn(item));
        }
      },
    );

    const newCard = {
      id: uuidv4(),
      title: value,
    };
    setCards((prevList: any) => [...prevList, newCard]);
    setIsSave(true);
    setIsClose(true);
    setValue('');
    dispatch(isCardUpdate(true));
  };
  const handleClose = () => {
    dispatch(isCardUpdate(false));
    setIsClose(true);
    setValue('');
  };
  return (
    <div className='create-card'>
      <form action='' onSubmit={handleSubmit}>
        <input
          className='default-input create-card__input'
          type='text'
          placeholder='Write a card name'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <div className='create-card__row flex'>
          <button className='button-dark create-card__button' type='submit'>
            Add a card
          </button>
          <button
            className='button-border create-card__button'
            type='button'
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
