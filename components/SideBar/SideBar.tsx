import {FC} from 'react';
import './SideBar.scss';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import Notification from '../Notification/Notification';

const SideBar: FC = () => {
  return (
    <div className='side-bar'>
      <div className='side-bar__container'>
        <Link href={'/'} className='side-bar__logo'></Link>
        <div className='side-bar__column'>
          <Link className='side-bar__link side-bar__link_board' href='/boards'>
            {/* Boards */}
          </Link>
          <Link className='side-bar__link' href='/user'>
            User
          </Link>
          <SignOut />
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
