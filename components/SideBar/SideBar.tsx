import {FC, useState} from 'react';
import './SideBar.scss';
import Link from 'next/link';
import SignOut from '../auth/SignOut/SignOut';
import Notification from '../Notification/Notification';

const SideBar: FC = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className={`side-bar ${isShow ? 'show' : ''}`}
      onMouseEnter={(e) => setIsShow(!isShow)}
      onMouseLeave={(e) => setIsShow(!isShow)}
    >
      <div className='side-bar__container'>
        <Link href={'/'} className='side-bar__logo'></Link>
        <div className='side-bar__column'>
          <div className='side-bar__box'>
            <Link
              className='side-bar__link side-bar__link_board '
              href='/boards'
            >
              <span>Boards</span>
            </Link>

            <Link className='side-bar__link side-bar__link_user ' href='/user'>
              <span>Profile</span>
            </Link>
            <Link
              className='side-bar__link side-bar__link_setting '
              href='/user'
            >
              {' '}
              <span>Settings</span>
            </Link>
          </div>
          {/* <Notification /> */}
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
