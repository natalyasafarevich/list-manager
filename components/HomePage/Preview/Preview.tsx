import {FC} from 'react';
import './Preview.scss';
import {motion} from 'framer-motion';
import Link from 'next/link';
const people = [
  {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
const Preview: FC = () => {
  return (
    <div className='preview '>
      <div className='preview__container container'>
        <div className='preview__row flex'>
          <div className='preview__info'>
            <p className='preview__title'>
              Transform Your Daily Tasks into Art <span>We care about our work and we care about our clients.</span>
            </p>
            <Link href={'/registration'} className='preview__link button-light-blue'>
              Lets start
            </Link>
          </div>
          <div className='preview__box'>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0, duration: 0.1}}
              className='preview__item preview__item-1'
            ></motion.div>
            {/* <div className='preview__item preview__item-1'></div> */}
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.1, duration: 0.2}}
              className='preview__item preview__item-2'
            ></motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.2, duration: 0.2}}
              className='preview__item preview__item-3'
            ></motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.3, duration: 0.2}}
              className='preview__item preview__item-4'
            ></motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.4, duration: 0.2}}
              className='preview__item preview__item-5'
            ></motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.5, duration: 0.2}}
              className='preview__item preview__item-6'
            ></motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.6, duration: 0.2}}
              className='preview__item preview__item-7'
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Preview;
