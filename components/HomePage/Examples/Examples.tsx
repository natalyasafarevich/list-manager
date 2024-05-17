import React, {FC, useState} from 'react';
import MotionItem from './MotionItem/MotionItem';
import Link from 'next/link';
import './Examples.scss';

const items = [
  {
    id: 1,
    title: 'Creating a new board',
    scr: '/TESTER-IMAGE-FOR-DEELITING.png',
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
  return (
    <div className='examples'>
      <div className='examples__container container'>
        <p className='examples__title'>
          Examples
          <span>A glimpse of our work</span>
        </p>
        <div className='examples__box'>
          <MotionItem items={items} />
        </div>
        <Link href={'/registration'} className='examples__link button-light-blue'>
          Try it now
        </Link>
      </div>
    </div>
  );
};

export default Examples;
