import {FC} from 'react';
import React from 'react';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
interface AnimatedSVGProps {
  d: string;
  color: string;
  width: string;
  height: string;
}
const AnimatedSVG: FC<AnimatedSVGProps> = ({d, color, width, height}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth='2'
        initial={{pathLength: 0, fill: 'rgba(255, 255, 255, 0)'}}
        animate={{pathLength: 1, fill: color}}
        transition={{delay: 1, duration: 2, fill: {delay: 2, duration: 1}}}
      />
    </svg>
  );
};

export default AnimatedSVG;
