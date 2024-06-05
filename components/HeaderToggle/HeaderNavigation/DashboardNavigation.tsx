import {motion} from 'framer-motion';
import {HeaderItem} from '../HeaderItem/HeaderItem';
import Link from 'next/link';
import './Navigation.scss';
import SignOut from '@/components/auth/SignOut/SignOut';

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

const links = [
  {
    href: '/boards',
    label: 'Boards',
  },
  {
    href: '/inbox',
    label: 'Inbox',
  },
  {
    href: '/templates',
    label: 'Templates',
  },
  {
    href: '/settings',
    label: 'Account',
  },
  {
    href: '/assistance',
    label: 'Assistance',
  },
];
export const DashboardNavigation = ({toggle}: MenuToggleProps) => {
  return (
    <motion.div className='navigation-list'>
      <motion.ul variants={variants}>
        {links.map((link: any, i: any) => (
          <HeaderItem key={i}>
            <Link key={link.href} href={link.href} onClick={toggle}>
              {link.label}
            </Link>
          </HeaderItem>
        ))}
      </motion.ul>
      <motion.div className='navigation-list-button'>
        <SignOut />
      </motion.div>
    </motion.div>
  );
};

const itemIds = [0, 1, 2, 3, 4];
