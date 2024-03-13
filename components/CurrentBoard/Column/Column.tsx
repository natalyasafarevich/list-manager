'use state';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
type ColumnProps = {
  name: string;
};
const Column: FC<ColumnProps> = ({name}) => {
  const [value, setValue] = useState('');
  const [isClose, setIsClose] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const [isSave, setIsSave] = useState(false);
  const s = useSelector((state: RootState) => state.column);
  console.log(s);
  const handleClose = () => {
    setIsClose(true);
    setValue('');
  };
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isSave) {
      dispatch(
        getColumnInfo({
          id: '25d01923-bd66-4cb1-b62e-888c148010b1',
          cards: cards,
        }),
      );
    }
    setIsSave(false);
  }, [isSave]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      id: uuidv4(),
      title: value,
      desc: '',
      chek: '',
    };
    setCards((prevList: any) => [...prevList, obj]);
    setIsSave(true);
  };
  return (
    <div className='m-2 border rounded p-3 bg-light text-dark '>
      <div className='d-flex w-100 justify-content-between'>
        <b>{name}</b>
        <button>set</button>
      </div>
      {!isClose ? (
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button className='btn btn-info' type='submit'>
            добавить карточку
          </button>
          <button
            className='btn btn-danger'
            type='button'
            onClick={handleClose}
          >
            close
          </button>
        </form>
      ) : (
        <button type='button' onClick={(e) => setIsClose(false)}>
          добавить карточку
        </button>
      )}
    </div>
  );
};

export default Column;
