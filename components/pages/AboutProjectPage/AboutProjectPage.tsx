'use client';
import React, {FC} from 'react';
import './AboutProjectPage.scss';
import Link from 'next/link';
import AnimatedSVG from '@/components/AnimatedSVG/AnimatedSVG';
import Tabs from './Tabs/Tabs';
import {PathParamsContext} from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

const AboutProjectPage: FC = () => {
  return (
    <div className='about-page'>
      <div className='about-page__container '>
        <p className='about-page__subtitle'>About</p>
        <p className='about-page__title'>
          Deep Dive into: <br /> Description and Technologies
        </p>
        <div className='about-page__row flex'>
          <Link href={'/'} target='_blank' className={'about-page__link text-underline'}>
            GitHub
          </Link>
          <Link href={'/'} target='_blank' className={'about-page__link text-underline'}>
            Own Website
          </Link>
          <Link href={'/'} target='_blank' className={'about-page__link text-underline'}>
            CV
          </Link>
        </div>
        <section className='about-page__desc'>
          <p>
            The <b>'HiveMind'</b> project was created as a personal project with the aim of providing users with a
            convenient tool for organizing and managing their tasks. The goal was to develop a simple, intuitively
            understandable, and efficient tool that helps improve time management and increase productivity.
          </p>

          <div className='about-page__box'>
            <p className='about-page__subtitle about-page__subtitle-large text-underline'>implemented functions </p>
            <Tabs />
          </div>
        </section>
        <div className='about-page__box'>
          <p className='about-page__subtitle about-page__subtitle-large text-underline'>Technologies</p>
          <div className='about-page__row about-page__row-wrap flex'>
            <p className='about-page__item  about-page__item-next'>
              <AnimatedSVG
                width='100'
                height='100'
                color='#212121'
                d='M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z'
              />
              Next.js
            </p>
            <p className='about-page__item about-page__item-redux'>
              <AnimatedSVG
                width='100'
                height='100'
                color='#212121'
                d='M 24 2 C 16.832 2 11 10.292328 11 20.486328 C 11 25.752514 12.564938 30.494647 15.060547 33.859375 A 3.5 3.5 0 0 0 18.5 38 A 3.5 3.5 0 1 0 18.5 31 A 3.5 3.5 0 0 0 17.931641 31.050781 C 16.143565 28.387233 15 24.611465 15 20.486328 C 15 12.633328 19.122 6 24 6 C 28.119 6 31.689125 10.7375 32.703125 16.9375 C 34.125125 17.3455 35.541688 17.897453 36.929688 18.564453 C 36.251687 9.2704531 30.712 2 24 2 z M 22.5 17 A 3.5 3.5 0 1 0 22.5 24 A 3.5 3.5 0 0 0 25.640625 22.041016 C 28.890379 21.837485 32.64609 22.840116 36.113281 24.917969 C 42.973281 29.030969 46.703812 36.223047 44.257812 40.623047 C 43.453812 42.069047 42.005359 43.108953 40.068359 43.626953 C 37.279359 44.372953 33.859234 43.993672 30.490234 42.638672 C 29.421234 43.632672 28.245891 44.565828 26.962891 45.423828 C 30.290891 47.104828 33.8105 47.996094 37.0625 47.996094 C 38.4725 47.996094 39.833516 47.830234 41.103516 47.490234 C 44.110516 46.685234 46.410906 44.982406 47.753906 42.566406 C 51.337906 36.117406 47.127922 26.858281 38.169922 21.488281 C 33.907448 18.931871 29.185543 17.753815 25.035156 18.09375 A 3.5 3.5 0 0 0 22.5 17 z M 9.1601562 23.324219 C 2.0791563 28.795219 -0.95795312 36.799406 2.2480469 42.566406 C 3.5910469 44.982406 5.8914375 46.685234 8.8984375 47.490234 C 10.169438 47.830234 11.527453 47.996094 12.939453 47.996094 C 16.739453 47.996094 20.910031 46.789672 24.707031 44.513672 C 28.954867 41.96696 32.09575 38.543722 33.876953 34.962891 C 35.628054 34.772138 37 33.301038 37 31.5 C 37 29.57 35.43 28 33.5 28 C 31.57 28 30 29.57 30 31.5 C 30 32.040225 30.132082 32.546629 30.351562 33.003906 C 28.907628 35.978686 26.213448 38.945387 22.650391 41.082031 C 18.354391 43.658031 13.599641 44.609953 9.9316406 43.626953 C 7.9956406 43.108953 6.5481406 42.069047 5.7441406 40.623047 C 3.8101406 37.143047 5.7462969 31.923469 10.029297 27.855469 C 9.6182969 26.415469 9.3241562 24.899219 9.1601562 23.324219 z'
              />
              Redux
            </p>
            <p className='about-page__item about-page__item-typescript'>
              <AnimatedSVG
                width='100'
                height='100'
                color='#212121'
                d='M45,4H5C4.447,4,4,4.448,4,5v40c0,0.552,0.447,1,1,1h40c0.553,0,1-0.448,1-1V5C46,4.448,45.553,4,45,4z M29,26.445h-5V42h-4	V26.445h-5V23h14V26.445z M30.121,41.112v-4.158c0,0,2.271,1.712,4.996,1.712c2.725,0,2.62-1.782,2.62-2.026	c0-2.586-7.721-2.586-7.721-8.315c0-7.791,11.25-4.717,11.25-4.717l-0.14,3.704c0,0-1.887-1.258-4.018-1.258s-2.9,1.013-2.9,2.096	c0,2.795,7.791,2.516,7.791,8.141C42,44.955,30.121,41.112,30.121,41.112z'
              />
              TypeScript
            </p>
            <p className='about-page__item about-page__item-firebase'>
              <AnimatedSVG
                width='100'
                height='100'
                color='#212121'
                viewBox={{h: '50', w: '50'}}
                d='M8.56 4.94L2.54 15.34 5.83-.2zM9.67 7.02L10.87 9.27 5.34 14.5zM14.16 6.15L12.37 7.85 10.85 4.99 12.28 2.53zM11.83 24c-1.83-1-8.55-4.78-8.55-4.78L19.33 4.01 22 18C17 21 17 21 11.83 24z'
              />
              Firebase
            </p>
            <p className='about-page__item about-page__item-quill'>
              <svg
                width='100'
                height='100'
                viewBox='0 0  100 20  '
                fill='none'
                preserveAspectRatio='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M643.3 211.5v91.8c0 19.5-3.5 90.9-76.1 90.9-75.9 0-74.3-71.3-74.3-98.8v-83.8h-39v94.1s-8.1 128.5 111.3 128.5 115.4-124.5 115.4-124.5v-98.2zM816.5 45.2H855v378.5h-38.5zM504 472.7c-79.4 0-194.9-12-268.3-12.8-12.2 0-23 1.5-32.6 3.9l13-11.6c14.3-12.9 37.6-20.9 43.4-22 94.4-18.6 164.8-93.7 164.8-212.8C424.3 83.2 329.3 0 212.1 0S0 76.9 0 217.3c0 126.8 84.9 208 193.1 216.5 0 0 5.7.1 6.4 3.6.6 3.1-4.8 7.6-4.8 7.6l-64.4 59.6 12.4 13.4 23.8-21.3c13.3-10.6 35.1-23.6 62.1-23.6 89.3 0 188.2 89.1 280.1 86.9 134.4-3.2 165.7-93 169.1-104.6.2-.4-55.6 17.3-173.8 17.3M39.4 217.3c0-114.3 77.3-177 172.8-177 95.4 0 172.8 67.7 172.8 177 0 112.6-77.3 177-172.8 177-95.5-.1-172.8-67.8-172.8-177M903.5 45.2H942v378.5h-38.5zm-174 165.9H768v212.5h-38.5z'
                  stroke='#212121'
                  stroke-width='1'
                  fill='rgba(33, 33, 33, 1)'
                  pathLength='1'
                  stroke-dashoffset='0px'
                  stroke-dasharray='1px 1px'
                ></path>
              </svg>
              <AnimatedSVG
                width='100'
                height='100'
                color='#212121'
                viewBox={{h: '20  ', w: '100'}}
                d='M643.3 211.5v91.8c0 19.5-3.5 90.9-76.1 90.9-75.9 0-74.3-71.3-74.3-98.8v-83.8h-39v94.1s-8.1 128.5 111.3 128.5 115.4-124.5 115.4-124.5v-98.2zM816.5 45.2H855v378.5h-38.5zM504 472.7c-79.4 0-194.9-12-268.3-12.8-12.2 0-23 1.5-32.6 3.9l13-11.6c14.3-12.9 37.6-20.9 43.4-22 94.4-18.6 164.8-93.7 164.8-212.8C424.3 83.2 329.3 0 212.1 0S0 76.9 0 217.3c0 126.8 84.9 208 193.1 216.5 0 0 5.7.1 6.4 3.6.6 3.1-4.8 7.6-4.8 7.6l-64.4 59.6 12.4 13.4 23.8-21.3c13.3-10.6 35.1-23.6 62.1-23.6 89.3 0 188.2 89.1 280.1 86.9 134.4-3.2 165.7-93 169.1-104.6.2-.4-55.6 17.3-173.8 17.3M39.4 217.3c0-114.3 77.3-177 172.8-177 95.4 0 172.8 67.7 172.8 177 0 112.6-77.3 177-172.8 177-95.5-.1-172.8-67.8-172.8-177M903.5 45.2H942v378.5h-38.5zm-174 165.9H768v212.5h-38.5z'
              />
              React Quill
            </p>
            <p className='about-page__item about-page__item-motion'>Framer Motion </p>
            <p className='about-page__item about-page__item-uuid'>UUID </p>
            <p className='about-page__item about-page__item-node'>Node.js</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProjectPage;
