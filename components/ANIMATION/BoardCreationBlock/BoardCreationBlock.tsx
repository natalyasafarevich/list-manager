'use client';
import * as React from 'react';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import '../styles.css';
import {CloseButton} from '../CloseButton';

type Notification = {
  id: number;
  title: string;
  desc: string;
  date: string;
};

const generateRandomText = () => {
  const randomTexts = [
    {title: 'Notification!', desc: 'New task created', date: '10.02.24'},
    {title: 'Notification!', desc: 'Task status updated', date: '11.02.24'},
    {title: 'Notification!', desc: 'New comment on task', date: '12.02.24'},
    {title: 'Notification!', desc: 'New invitation received', date: '13.02.24'},
  ];

  const randomIndex = Math.floor(Math.random() * randomTexts.length);
  return randomTexts[randomIndex];
};

export const BoardCreationBlock = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const initialNotifications = [];
    for (let i = 0; i < 5; i++) {
      const randomText = generateRandomText();
      initialNotifications.push({
        id: i,
        title: randomText.title,
        desc: randomText.desc,
        date: randomText.date,
      });
    }
    return initialNotifications;
  });

  const addNotification = () => {
    const newId = notifications.length;
    const randomText = generateRandomText();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {id: newId, title: randomText.title, desc: randomText.desc, date: randomText.date},
    ]);
  };

  return (
    <div className='container'>
      <ul>
        <AnimatePresence initial={false}>
          {notifications.map(({id, title, desc, date}) => (
            <motion.li
              key={id}
              initial={{opacity: 0, y: 50, scale: 0.3}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, scale: 0.5, transition: {duration: 0.3}}}
            >
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <p>{date}</p>
              </div>
              <CloseButton />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button className='add' onClick={addNotification}>
        +
      </button>
    </div>
  );
};

export default BoardCreationBlock;
