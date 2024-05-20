import {FC} from 'react';
import './Preview.scss';
import {motion} from 'framer-motion';
import Link from 'next/link';
import BlueGradientButton from '@/components/Buttons/BlueGradientButton/BlueGradientButton';

const Preview: FC = () => {
  const title = 'Transform Your Daily Tasks into Art'.split(' ');
  const subtitle = 'We care about our work and we care about our clients.'.split(' ');
  return (
    <section className='preview '>
      <div className='preview__container container'>
        <div className='preview__row flex'>
          <div className='preview__info'>
            <div className='preview__title'>
              <div className='preview__flex flex'>
                {title.map((el, i) => (
                  <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                      duration: 1,
                      delay: i / 10,
                    }}
                    key={i}
                  >
                    {el}
                  </motion.p>
                ))}
              </div>
              <div className='preview__flex flex'>
                {subtitle.map((el, i) => (
                  <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                      duration: 1,
                      delay: i / 10,
                    }}
                    key={i}
                  >
                    {el}
                  </motion.span>
                ))}
              </div>
            </div>

            <BlueGradientButton
              href={'/registration'}
              title='Lets start'
              className='  preview__link button-light-blue'
            />
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
    </section>
  );
};
export default Preview;
