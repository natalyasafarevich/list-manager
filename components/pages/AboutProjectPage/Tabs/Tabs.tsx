'use client';
import {FC, useState} from 'react';
import './Tabs.scss';
import {useAnimation, motion, AnimatePresence} from 'framer-motion';
import {tabs} from '@/variables/Tabs';

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const controls = useAnimation();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    controls.start({left: `calc(${index * 100}% / 5)`});
  };
  return (
    <div className='tabs'>
      <div className='tabs__container'>
        <div className='tabs__row flex'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tabs__item ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <motion.div
          className='underline'
          layoutId='underline'
          animate={controls}
          style={{
            width: `${100 / tabs.length}%`,
          }}
        />
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          className='tabs__content'
          initial={{y: 10, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: -10, opacity: 0}}
          transition={{duration: 0.2}}
        >
          {tabs[activeTab]?.content?.info.map((item, i) => (
            <div key={i} className='about-page__item'>
              {item.title}
              <span>{item.desc}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Tabs;
