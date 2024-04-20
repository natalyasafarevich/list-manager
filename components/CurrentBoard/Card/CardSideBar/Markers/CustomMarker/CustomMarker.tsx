'use client';
import {FC, useState} from 'react';
import './CustomMarker.scss';
const randomHexColors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
];

const CustomMarker: FC = () => {
  const [value, setValue] = useState('');
  const createCustomMarker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className='custom-marker' onSubmit={createCustomMarker}>
      <div className='custom-marker__container'>
        <div className='custom-marker__box'>
          {randomHexColors.map((color, i) => (
            <div
              key={i}
              className='custom-marker__item'
              style={{background: color}}
            ></div>
          ))}
        </div>
        <input
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          type='text'
          className='custom-marker__input default-input'
        />
      </div>
      <button className='custom-marker__button  button-dark'>
        Create a custom tag
      </button>
    </form>
  );
};

export default CustomMarker;
