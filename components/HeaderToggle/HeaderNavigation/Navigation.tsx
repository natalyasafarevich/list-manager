import {motion} from 'framer-motion';
import {HeaderItem} from '../HeaderItem/HeaderItem';
import {links} from '@/variables/default';
import {useState} from 'react';
import ClickAwayListener from '@/components/ClickAwayListener/ClickAwayListener';
import Link from 'next/link';
import './Navigation.scss';
import BlueGradientButton from '@/components/Buttons/BlueGradientButton/BlueGradientButton';

const variants = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.2},
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
  },
};
interface MenuToggleProps {
  toggle: () => void;
}

export const Navigation = ({toggle}: MenuToggleProps) => {
  const [isTestingItem, setIsTestingItem] = useState(false);
  return (
    <motion.ul variants={variants} className='navigation-list'>
      {links.map((link, i) => (
        <HeaderItem key={i}>
          <Link key={link.href} href={link.href} onClick={toggle}>
            {link.label}
          </Link>
        </HeaderItem>
      ))}

      <HeaderItem>
        <motion.span className={` header__link__test`}>
          <span onClick={(_e) => setIsTestingItem(!isTestingItem)}>Testing*</span>
        </motion.span>
        {isTestingItem && (
          <ClickAwayListener setIsOpen={(e) => setIsTestingItem(e)}>
            <div className='header__popup'>
              <p>Data for testing:</p>
              <span>
                Login: <b>tester@test.com</b>
              </span>
              <span>
                Password: <b>Test1234!</b>
              </span>
            </div>
          </ClickAwayListener>
        )}
      </HeaderItem>
      <div className='header__links flex' onClick={toggle}>
        <Link className='header__link' href='/registration'>
          Sign Up
        </Link>
        <BlueGradientButton
          title='Sign In'
          className='header__link header__link-sign-in button-light-blue'
          href='/log-in'
        />
      </div>
    </motion.ul>
  );
};

const itemIds = [0, 1, 2, 3, 4];
