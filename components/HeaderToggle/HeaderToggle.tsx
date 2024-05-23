import {useEffect, useRef} from 'react';
import {motion, useCycle} from 'framer-motion';
import {Navigation} from './HeaderNavigation/Navigation';
import {HeaderIconPath} from './HeaderIconPath/HeaderIconPath';
import {AppDispatch} from '@/store/store';
import {useDispatch} from 'react-redux';
import {toggleMenu} from '@/store/menu/actions';
import './HeaderToggle.scss';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export const HeaderToggle = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleMenu(isOpen));
  }, [isOpen]);

  return (
    <motion.nav
      className={`header-toggle ${isOpen ? 'open' : 'closed'}`}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={containerRef}
    >
      <motion.div className='header-toggle__container' variants={sidebar} />

      <div className={`header-toggle__navigation ${isOpen ? 'open' : 'closed'}`}>
        <Navigation toggle={() => toggleOpen()} />
      </div>

      <HeaderIconPath toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
