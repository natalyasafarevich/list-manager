import {FC, useState} from 'react';
import './AboutProjectPage.scss';
import {motion, useAnimation} from 'framer-motion';
import Link from 'next/link';
import Tabs from './Tabs/Tabs';
// const implementedFunctions = [
//   {
//     title: 'Доска',

//     info: [
//       {
//         title: 'Создание Доски',
//         desc: 'Пользователи могут создавать новые доски, указывая заголовок, тип доски и фон.',
//       },

//       {
//         title: 'Закрытие доски',
//         desc: 'После закрытия доска будет перемещена в closed board',
//       },
//       {
//         title: 'Изменение фона',
//         desc: 'Возможность загрузки своего фона и выбрать фон из предоставлений изображений и цветов ',
//       },
//       {
//         title: 'Копирование доски',
//         desc: 'При копировании доски реализована возможность оставить существующие карточки',
//       },
//       {
//         title: 'Добавление пользователей на доску ',
//         desc: 'Типы пользователей доски - администратор,участник и гость (каждая роль имеет свои права доступа)',
//       },
//       {
//         title: 'Добавления описания к доске',
//       },
//       {
//         title: 'Смена названия доски',
//       },
//       {
//         title: 'Добавления в избранное',
//       },
//     ],
//   },
//   // {
//   //   title: 'Добавление колонок в доску',
//   //   desc: 'Пользователи могут создавать новые колонки, указывая заголовок и настаивать их (архивировать)',
//   // },
// ];\

const implementedFunctions = [
  {
    title: 'Board',

    info: [
      {
        title: 'Creating a Board',
        desc: 'Users can create new boards by specifying a title, board type, and background.',
      },

      {
        title: 'Closing a Board',
        desc: 'After closing, the board will be moved to the closed board section.',
      },
      {
        title: 'Changing Background',
        desc: 'Ability to upload custom backgrounds and choose from provided images and colors.',
      },
      {
        title: 'Copying a Board',
        desc: 'When copying a board, the option to retain existing cards is implemented.',
      },
      {
        title: 'Adding Users to a Board',
        desc: 'Board user types - administrator, member, and guest (each role has its own access rights).',
      },
      {
        title: 'Adding a Description to a Board',
      },
      {
        title: 'Changing the Board Title',
      },
      {
        title: 'Adding to Favorites',
      },
    ],
  },
  // {
  //   title: 'Adding Columns to a Board',
  //   desc: 'Users can create new columns, specifying a title and customizing them (archive).',
  // },
];
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
        <div className='about-page__desc'>
          <p>
            The <b>'HiveMind'</b> project was created as a personal project with the aim of providing users with a
            convenient tool for organizing and managing their tasks. The goal was to develop a simple, intuitively
            understandable, and efficient tool that helps improve time management and increase productivity.
          </p>

          <section className='about-page__box'>
            <p className='about-page__subtitle about-page__subtitle-large text-underline'>implemented functions </p>
            <Tabs />
            {/* {implementedFunctions.map((item, i) => (
              <div className='about-page__info' key={i}>
                <span className='about-page__paragraph'> {item.title}</span>
                <ul className='about-page__list'>
                  {item.info.map((info, i) => (
                    <li className='about-page__item' key={i}>
                      {info.title}
                      <span>{info.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutProjectPage;
