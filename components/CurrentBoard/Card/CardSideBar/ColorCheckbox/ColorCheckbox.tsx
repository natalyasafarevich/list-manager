import {AppDispatch, RootState} from '@/store/store';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ColorCheckbox.scss';

interface ColorCheckboxProps {
  data: {id: string; color: string};
  addedID: (value: string) => void;
  removeID: (value: string) => void;
}

const ColorCheckbox: FC<ColorCheckboxProps> = ({data, addedID, removeID}) => {
  const [isChecked, setIsChecked] = useState(false);

  const currentMarkers = useSelector(
    (state: RootState) => state.markers.markers,
  );
  useEffect(() => {
    currentMarkers.map((item) => {
      if (item === data.color) {
        setIsChecked(true);
      }
    });
  }, [currentMarkers]);
  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    const checkbox = e.target.checked;
    const id = e.target.dataset.id;
    if (id) {
      if (checkbox) {
        addedID(id);
      } else {
        removeID(id);
      }
    }
  };
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
