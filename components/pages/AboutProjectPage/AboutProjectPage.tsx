'use client';
import React, {FC} from 'react';
import './AboutProjectPage.scss';
import Link from 'next/link';
import AnimatedSVG from '@/components/AnimatedSVG/AnimatedSVG';
import Tabs from './Tabs/Tabs';
import BlueGradientButton from '@/components/Buttons/BlueGradientButton/BlueGradientButton';
import {technologies} from '@/variables/technologies';

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
          <p className='about-page__subtitle about-page__subtitle-large text-underline'>Main Technologies:</p>
          <div className='about-page__row about-page__row-wrap flex'>
            {technologies.map((technology, index) => (
              <Link key={index} href={technology.url || '#'} className='about-page__item about-page__item-technology'>
                {technology.d && <AnimatedSVG d={technology.d} width='100' height='100' color='black' />}
                {technology.src && (
                  <span
                    className='about-page__icon'
                    style={{background: `center/contain no-repeat url(${technology.src})`}}
                  ></span>
                )}
                {technology.title}
              </Link>
            ))}
          </div>{' '}
          <BlueGradientButton
            title='More technologies'
            href='https://github.com/natalyasafarevich/list-manager'
            className='about-page__button button-light-blue '
          />
        </div>
      </div>
    </div>
  );
};

export default AboutProjectPage;
