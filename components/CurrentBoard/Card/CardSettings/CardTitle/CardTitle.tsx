// CardTitle.tsx
import React, { FC } from 'react';

interface CardTitleProps {
  title: string;
  columnName: string;
  setIsOpenCard: () => void;
}

const CardTitle: FC<CardTitleProps> = ({ title, columnName, setIsOpenCard }) => {
  return (
    <div className='card-title'>
      <div className='d-flex justify-content-between align-items-center'>
        <span>
          <b>{title}</b>
          <br />
          <span className=''>
            в колонке: <b>{columnName}</b>
          </span>
        </span>
        <button onClick={setIsOpenCard}>x</button>
      </div>
    </div>
  );
};

export default CardTitle;
