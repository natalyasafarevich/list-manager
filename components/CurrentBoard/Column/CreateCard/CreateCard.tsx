'use client';
import {RootState} from '@/store/store';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';
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
  // const [cardIndex, setCardIndex] = useState<number>(0);
  // const tt = useSelector((state: RootState) => state.column);
  // console.log(tt);
  const [value, setValue] = useState('');

  const user = useSelector((state: RootState) => state);
  const current_column = useSelector((state: RootState) => state.column);

  const current_board = useSelector((state: RootState) => state?.boards);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    current_board.boards[current_board.index]?.lists.map(
      (item: any, i: number) => {
        if (item.id === listId) {
          setCardIndex(i);
          // console.log(item);
        }
      },
    );
    // const dataId = e.currentTarget.dataset.id;
    // console.log(dataId);
    // console.log(listId);
    const obj = {
      id: uuidv4(),
      title: value,
      desc: '',
      chek: '',
    };
    setCards((prevList: any) => [...prevList, obj]);
    setIsSave(true);
    setIsClose(true);
    setValue('');
  };
  const handleClose = () => {
    setIsClose(true);
    setValue('');
  };
  return (
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
  );
};

export default CreateCard;
