'use client';
import {FC, useState} from 'react';

const markers = [
  {
    color: '#4bce97',
  },
  {
    color: '#f5cd47',
  },
  {
    color: '#fea362',
  },
  {
    color: '#9f8fef',
  },
  {
    color: '#579dff',
  },
];

const Markers: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chooseMark = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    if (newValue) {
      console.log(e.target.dataset.color);
    }
    // console.log(newValue);
  };
  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}>метки</p>
      {isOpen && (
        <div
          className='position-absolute p-2'
          style={{
            background: 'white',
            width: '200px',
            right: 0,
            top: 0,
            border: '1px solid black',
          }}
        >
          <div className='d-flex justify-content-between '>
            <span className='text-center'>Метки</span>
            <button onClick={() => setIsOpen(!isOpen)}>x</button>
          </div>
          <div className=''>
            {markers.map((item, i) => (
              <div className='' key={i}>
                <input
                  data-color={item.color}
                  onChange={chooseMark}
                  type='checkbox'
                  id={`${i}`}
                  name={`checkbox${i}`}
                />
                <label
                  htmlFor={`checkbox${i}`}
                  style={{
                    background: item.color,
                    width: '50%',
                    height: '10px',
                    display: 'flex',
                  }}
                ></label>
                <br />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Markers;
