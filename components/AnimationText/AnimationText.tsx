import {FC} from 'react';
import {motion} from 'framer-motion';

interface AnimationTextProps {
  title: string;
  isTitle?: boolean;
  isSpan?: boolean;
}

const AnimationText: FC<AnimationTextProps> = ({title, isTitle, isSpan}) => {
  if (isTitle)
    return (
      <>
        {title.split(' ').map((el, i) => (
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
              duration: 0.5,
              delay: i / 10,
            }}
            key={i}
          >
            {el}
          </motion.p>
        ))}
      </>
    );
  if (isSpan)
    return (
      <>
        {title.split(' ').map((el, i) => (
          <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
              duration: 0.5,
              delay: i / 8,
            }}
            key={i}
          >
            {el}
          </motion.span>
        ))}
      </>
    );
};

export default AnimationText;
