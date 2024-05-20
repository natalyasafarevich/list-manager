import React, {FC} from 'react';
import {motion} from 'framer-motion';
interface AnimatedSVGProps {
  d: string;
  color: string;
  width: string;
  height: string;
  viewBox?: {
    w: string;
    h: string;
  };
}
const AnimatedSVG: FC<AnimatedSVGProps> = ({d, color, width, height, viewBox}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${viewBox ? `0 0  ${viewBox.w} ${viewBox.h}` : `0 0  ${width} ${height}}`}`}
      fill='none'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth='1'
        initial={{pathLength: 0, fill: 'rgba(255, 255, 255, 0)'}}
        animate={{pathLength: 1, fill: color}}
        transition={{delay: 1, duration: 2, fill: {delay: 2, duration: 1}}}
      />
    </svg>
  );
};

export default AnimatedSVG;
