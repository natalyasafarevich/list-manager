'use client';
import {FC, useState} from 'react';

const AdditionalMenu: FC = () => {
  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  return (
    <>
      <div className='position-absolute top-0 end-0 bg-info text-light p-4 w-25 z-3'>
        <div className='d-flex justify-content-between align-item-center'>
          {isAboutBoardOpen && (
            <button onClick={() => setIsAboutBoardOpen(!isAboutBoardOpen)}>
              back
            </button>
          )}

          <h4>меню</h4>
          <button>close</button>
        </div>
        <hr />
        {!isAboutBoardOpen ? (
          <div className='align-item-center__'>
            <p onClick={() => setIsAboutBoardOpen(!isAboutBoardOpen)}>
              <b> о доске</b>
              <i className='d-block'>Добавьте описание для доски</i>
            </p>
          </div>
        ) : (
          <div>
            <h2>Администраторы доски</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default AdditionalMenu;
