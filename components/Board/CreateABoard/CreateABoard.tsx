'use client';
import Image from 'next/image';
import {FC, useState} from 'react';

const CreateABoard: FC = () => {
  const [currentBg, setCurrentBg] = useState<string>('');
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentBg(e.currentTarget?.dataset?.url as string);
  };
  return (
    <div className='d-block'>
      <h2>создать доску</h2>
      <div className='w-50'>
        <div
          style={{
            margin: '0 auto 50px',
            width: 'max-content',
            padding: '15px',
            background: `center/cover no-repeat url(${currentBg})`,
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
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rlekc)`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rlekk'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rlekk  )`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rleky'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rleky)`,
            }}
          ></button>
          <button
            data-url='http://surl.li/rleim'
            onClick={handleClick}
            style={{
              width: '100px',
              height: '100px',
              background: `center/cover no-repeat url(http://surl.li/rleim)`,
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default CreateABoard;
