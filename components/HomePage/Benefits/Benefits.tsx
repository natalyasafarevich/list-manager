import {FC, useRef} from 'react';
import './Benefits.scss';
import Image from 'next/image';
import {motion, useScroll, useInView, useSpring, useTransform, MotionValue} from 'framer-motion';

import AnimationText from '@/components/AnimationText/AnimationText';
const benefits = [
  {title: 'Task Management', desc: 'Easily create, edit, and delete tasks.', src: '/ph_ruler-fill.svg', delay: 0},
  {
    title: 'Real-Time Collaboration',
    desc: 'Invite colleagues and friends to collaborate on projects in real-time.',
    src: '/fluent_chess-20-filled.svg',
    delay: 0.6,
  },
  {
    title: 'Creating To-Do Lists',
    desc: 'Organize tasks into lists for different projects or goals.',
    src: '/fluent_target-arrow-16-filled.svg',
    delay: 1.2,
  },
  {
    title: 'Personalized Interface',
    desc: 'Customize the appearance of your task board to match your preferences.',
    src: '/heroicons-solid_lightning-bolt.svg',
    delay: 1.8,
  },
];

const Benefits: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  return (
    <div className='benefits'>
      <div className='benefits__container container'>
        <div className='benefits__row flex' ref={ref}>
          <div className='benefits__info'>
            <div className='benefits__title'>
              <div className='flex-wrap'>
                {isInView && <AnimationText isTitle={true} title={'Benefits of Registration'} />}
              </div>
              <div className='flex-wrap'>
                {isInView && (
                  <AnimationText
                    isSpan={true}
                    title={`Sign up to gain access to powerful tools for task management, creating to-do lists, and personalized
  recommendations. Enjoy enhanced productivity and ease in organizing your projects.`}
                  />
                )}
              </div>
            </div>
          </div>{' '}
          <div className='benefits__box'>
            {benefits.map(
              (item, i) =>
                isInView && (
                  <motion.div
                    initial={{width: '0%', overflow: 'hidden'}}
                    animate={{
                      width: '100%',
                      transition: {delay: item?.delay, duration: 0.6, ease: 'linear'},
                    }}
                    exit={{opacity: 0, y: -20}}
                    className='benefits__item'
                    key={i}
                  >
                    <div className='benefits__icon'>
                      <Image src={item.src} width={40} height={40} alt='' />
                    </div>
                    <p className='benefits__name'>
                      {item.title}
                      <span>{item.desc}</span>
                    </p>
                  </motion.div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Benefits;
