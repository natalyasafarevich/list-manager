'use client';
import {FC, useState} from 'react';

const Archives: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p onClick={(e) => setIsOpen(!isOpen)}>Archives</p>
    </div>
  );
};

export default Archives;
