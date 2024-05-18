import React, {FC, useRef, useState} from 'react';
import MotionItem from './MotionItem/MotionItem';
import Link from 'next/link';
import './Examples.scss';
import BlueGradientButton from '@/components/Buttons/BlueGradientButton/BlueGradientButton';
import {useInView} from 'framer-motion';
import AnimationText from '@/components/AnimationText/AnimationText';

const items = [
  {
    id: 1,
    title: 'Creating a new board',
    scr: '/gif-1.gif',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenV0bXNmajdpcDR5bmt4dXM2MWlheTRkOWw1Znozamxsa3lxM3R6MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i3PDbb7zaqNuyRrVKe/giphy.gif',
  },
  {
    id: 2,
    title: 'Inviting new members',
    scr: '/TESTER-IMAGE-FOR-DEELITING.png',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjRjaTdkNDdyeHFrMTRlcXo0YzV6NTdvZXEzY2I3ZmFscW83dDliNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xYGnFm4mVcMxYIVq3v/giphy.gif',
  },
  {
    id: 3,
    title: 'Communication in real-time',
    scr: '/TESTER-IMAGE-FOR-DEELITING.png',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDUzeWk0cWZwdWowY3gzcDF1M2o5dzM2NGZxdnk2dThtNTM5bzduMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vi0Ws3t4JSLOgdkaBq/giphy-downsized-large.gif',
  },
];

const Examples: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  return (
    <div className='examples'>
      <div className='examples__container container'>
        <div className='examples__title' ref={ref}>
          <div className='flex-wrap'>{isInView && <AnimationText isTitle={true} title={'Examples'} />}</div>
          <div className='flex-wrap'>{isInView && <AnimationText isSpan={true} title={'A glimpse of our work'} />}</div>
        </div>
        <div className='examples__box'>{isInView && <MotionItem items={items} />}</div>
        <BlueGradientButton href={'/registration'} title='  Try it now' className='examples__link button-light-blue' />
      </div>
    </div>
  );
};

export default Examples;
