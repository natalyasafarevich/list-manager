'use client';
import {FC, useState} from 'react';
import './CustomMarker.scss';
import {v4 as uuidv4} from 'uuid';
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
interface CustomMarkerProps {
  updateCheckedMarks: (
    value: string,
    text: any,
    id: any,
    isCustom?: boolean,
  ) => void;
}
const CustomMarker: FC<CustomMarkerProps> = ({updateCheckedMarks}) => {
  const [value, setValue] = useState('');
  const [color, setColor] = useState('');

  const createCustomMarker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uuidv4();

    updateCheckedMarks(color, value, id, true);
    setValue('');
    setColor('');
  };
  return (
    <form className='custom-marker' onSubmit={createCustomMarker}>
      <div className='custom-marker__container'>
        <div className='custom-marker__box'>
          {randomHexColors.map((color, i) => (
            <div key={i} className='custom-marker__item'>
              <input
                className='custom-marker__input'
                type='radio'
                id={`custom-marker-${i}`}
                name='custom-marker'
                onChange={(e) => e.currentTarget.checked && setColor(color)}
              />
              <label
                className='custom-marker__label'
                htmlFor={`custom-marker-${i}`}
                style={{background: color}}
              ></label>
            </div>
          ))}
        </div>
        <div className='custom-marker__info'>
          <label htmlFor='marker-title'>Tag name</label>
          <input
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            type='text'
            id='marker-title'
            className='custom-marker__input-text default-input'
          />
        </div>
        <button className='custom-marker__button  button-dark'>
          Create a custom tag
        </button>
      </div>
    </form>
  );
};

export default CustomMarker;
