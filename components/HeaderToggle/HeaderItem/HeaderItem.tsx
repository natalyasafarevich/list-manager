import {motion} from 'framer-motion';
import './HeaderItem.scss';
import Link from 'next/link';
import {FC, ReactNode} from 'react';
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};

interface HeaderItemProps {
  children: ReactNode;
}

export const HeaderItem: FC<HeaderItemProps> = ({children}) => {
  return (
    <motion.li variants={variants} whileTap={{scale: 0.95}} className='header-item'>
      {children}
    </motion.li>
  );
};
