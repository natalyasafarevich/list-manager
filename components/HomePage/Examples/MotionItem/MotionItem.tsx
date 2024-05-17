import {FC, useState} from 'react';
import './MotionItem.scss';
import {motion, AnimatePresence} from 'framer-motion';
interface MotionItemProps {
  items: any;
}

const MotionItem: FC<MotionItemProps> = ({items}) => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className='motion-item'>
      <div className='motion-item__list'>
        {items.map((item: any) => (
          <motion.div
            key={item.id}
            layout
            layoutId={item.id}
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className='motion-item__item'
          >
            <motion.div
              className='motion-item__animation'
              style={{background: `right/cover no-repeat url(${item.scr})`}}
            ></motion.div>
            <motion.h2 className='motion-item__title'>{item.title}</motion.h2>
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedId && (
            <motion.div
              key={selectedId}
              layout
              layoutId={selectedId}
              className='motion-item__active'
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
            >
              <motion.div className='motion-item__popup'>
                <motion.div
                  className='motion-item__gif'
                  style={{
                    background: `center/cover no-repeat url(${items.find((item: any) => item.id === selectedId).gif})`,
                  }}
                ></motion.div>
                <motion.button
                  className='button-close  motion-item__button'
                  onClick={() => setSelectedId(null)}
                ></motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MotionItem;
