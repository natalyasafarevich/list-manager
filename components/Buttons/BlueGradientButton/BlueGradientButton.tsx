'use client';
import {FC, useState} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';

interface BlueGradientButtonProps {
  title: string;
  className: string;
  href: string;
}
const BlueGradientButton: FC<BlueGradientButtonProps> = ({title, className, href}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{backgroundImage: 'linear-gradient(0deg, rgb(52, 97, 255) , rgb(52, 97, 255)  '}}
      // transition={{duration: 5, ease: 'linear'}}
      whileHover={{
        backgroundImage: 'linear-gradient(360deg, rgb(52, 97, 255) , rgb(51, 255, 238))',
        transition: {from: 0, duration: 4, repeat: Infinity, ease: 'linear'},
      }}
      // className={className}
      className={className}
    >
      {title}
    </motion.a>
  );
};

export default BlueGradientButton;
