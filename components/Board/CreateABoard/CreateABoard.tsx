'use client';
import Image from 'next/image';
import {FC, useState} from 'react';
import VisibilityBoard from '../VisibilityBoard/VisibilityBoard';

const CreateABoard: FC = () => {
  const [currentBg, setCurrentBg] = useState<string>('http://surl.li/rleim');
  const [value, setValue] = useState<string>('');
  const [visibility, setVisibility] = useState('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentBg(e.currentTarget?.dataset?.url as string);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length === 0) {
      alert('ВВедите название');
      return;
    }
    console.log(currentBg, value, visibility);
  };
  return (
    <form className='d-block mb-5' onSubmit={handleSubmit}>
      <h2>создать доску</h2>
      <div className='w-50 mb-5'>
        <div
          style={{
            margin: '0 auto 50px',
            width: 'max-content',
            padding: '15px',
            backgroundImage: `url(${currentBg})`,
          }}
        >
          <Image
            width={100}
            height={100}
            src='/trello-board-img.svg'
            alt='board'
          ></Image>
        </div>

        <div className='d-flex justify-content-between'>
          <button
            type='button'
            onClick={handleClick}
            data-url='http://surl.li/rleim'
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rleim)`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rlekc'
            type='button'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rlekc)`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rlekk'
            type='button'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rlekk  )`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rleky'
            type='button'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rleky)`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rleim'
            type='button'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rleim)`,
            }}
          ></button>
        </div>
        <div className='d-flex mt-2 justify-content-between'>
          <button
            type='button'
            onClick={handleClick}
            data-url={'/trello-bg-1.svg'}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(/trello-bg-1.svg)`,
            }}
          ></button>
          <button
            type='button'
            onClick={handleClick}
            data-url={'https://trello.com/assets/d106776cb297f000b1f4.svg'}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(https://trello.com/assets/d106776cb297f000b1f4.svg)`,
            }}
          ></button>
          <button
            type='button'
            onClick={handleClick}
            data-url={'https://trello.com/assets/a7c521b94eb153008f2d.svg'}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(https://trello.com/assets/a7c521b94eb153008f2d.svg)`,
            }}
          ></button>
          <button
            type='button'
            onClick={handleClick}
            data-url={'https://trello.com/assets/aec98becb6d15a5fc95e.svg'}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(https://trello.com/assets/aec98becb6d15a5fc95e.svg)`,
            }}
          ></button>
        </div>
        <div className='mt-4'>
          <label htmlFor='title'>Заголовок доски</label>
          <input type='text' id='title' value={value} onChange={handleChange} />
        </div>
        <p className='text-danger'>Настроить и продумать логику</p>
        <VisibilityBoard currentValue={(e) => setVisibility(e)} />
      </div>
      <button type='submit' className='btn btn-dark'>
        создать доску
      </button>
    </form>
  );
};

export default CreateABoard;
