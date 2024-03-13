'use client';
import {FC, useState} from 'react';
import Column from '../Column/Column';

const NewColumn: FC = () => {
  const [components, setComponents] = useState<Array<any>>([]);
  const addComponents = () => {
    const newComponents = [...components, <Column />];
    setComponents(newComponents);
  };
  return (
    <div className='d-flex align-items-center'>
      {components.map((component, i) => (
        <div className='' key={i}>
          {component}
        </div>
      ))}
      <button onClick={addComponents}>добавить коллонку</button>
    </div>
  );
};

export default NewColumn;
