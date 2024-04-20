import {AppDispatch, RootState} from '@/store/store';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import './ColorCheckbox.scss';

interface ColorCheckboxProps {
  data: any;
  addedID: (value: string, text?: string, id?: string) => void;
  removeID: (value: string) => void;
}

const ColorCheckbox: FC<ColorCheckboxProps> = ({data, addedID, removeID}) => {
  const [isChecked, setIsChecked] = useState(false);

  const currentMarkers = useSelector(
    (state: RootState) => state.markers.markers,
  );

  useEffect(() => {
    for (let key in currentMarkers) {
      console.log('key', currentMarkers);
      if (key === data.id) {
        setIsChecked(true);
      }
    }
  }, [currentMarkers]);
  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    const checkbox = e.target.checked;
    const id = e.target.dataset.id;
    if (id) {
      if (checkbox) {
        addedID(id, '', data.id);
      } else {
        removeID(data.id);
      }
    }
  };
  console.log('data', data);
  return (
    <div className='color-checkbox'>
      <input
        className='color-checkbox__input'
        onChange={changeCheckBox}
        type='checkbox'
        data-id={data.color}
        id={data.id}
        name='name'
        checked={isChecked}
      />
      <label
        className='color-checkbox__label'
        htmlFor={data.id}
        style={{
          background: data.color,
        }}
      ></label>
    </div>
  );
};

export default ColorCheckbox;
