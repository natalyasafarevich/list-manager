'use client';
import {FC} from 'react';
import {motion} from 'framer-motion';

interface BlueGradientButtonProps {
  title: string;
  className: string;
  href: string;
}
const BlueGradientButton: FC<BlueGradientButtonProps> = ({title, className, href}) => {
  return (
    <motion.a
      href={href}
      initial={{backgroundImage: 'linear-gradient(0deg, rgb(52, 97, 255) , rgb(52, 97, 255)  '}}
      whileHover={{
        backgroundImage: 'linear-gradient(360deg, rgb(52, 97, 255) , rgb(51, 255, 238))',
        transition: {from: 0, duration: 4, repeat: Infinity, ease: 'linear'},
      }}
      className={className}
    >
      {title}
    </motion.a>
  );
};

export default BlueGradientButton;
