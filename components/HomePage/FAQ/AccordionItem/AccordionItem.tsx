'use client';
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import './AccordionItem.scss';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className='accordion-item'>
      <motion.div layout onClick={toggleOpen} className='accordion-item__header'>
        <p className='accordion-item__title'>{title}</p>
      </motion.div>
      {isOpen && (
        <motion.div
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: 'auto'}}
          exit={{opacity: 0, height: 0}}
          className='accordion-item__content'
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default AccordionItem;
