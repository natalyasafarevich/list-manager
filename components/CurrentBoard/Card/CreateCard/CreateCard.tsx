'use client';
import {isCreateCard} from '@/store/column-setting/actions';
import {getCurrentColumn} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

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
          console.log(item);
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
  };
  const handleClose = () => {
    dispatch(isCreateCard({isCreate: true}));

    setIsClose(true);
    setValue('');
  };
  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button className='btn btn-info' type='submit'>
          добавить карточку
        </button>
        <button className='btn btn-danger' type='button' onClick={handleClose}>
          close
        </button>
      </form>
    </>
  );
};

export default CreateCard;
