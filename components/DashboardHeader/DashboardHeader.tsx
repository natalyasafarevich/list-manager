
import {FC, useState} from 'react';
import axios from 'axios';
import './DashboardHeader.scss';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Search from '../Search/Search';
import ProfilePopup from '../ProfilePopup/ProfilePopup';

const DashboardHeader: FC = () => {
  return (
    <div className='dashboard-header'>
      <div className='dashboard-header__container '>
        <div className='content-wrap'>
          <div className='dashboard-header__row'>
            <div className='dashboard-header__box'>
              <Link href={'/'} className='dashboard-header__logo logo'></Link>
              <Link href={'/boards'} className='dashboard-header__link'>
                Boards
              </Link>
              <div className='dashboard-header__search'>
                <Search />
              </div>
            </div>
            <div className='dashboard-header__box dashboard-header__box_icons'>
              <button className='dashboard-header__button dashboard-header__button_add'></button>
              <button className='dashboard-header__button dashboard-header__button_notification'></button>
              <ProfilePopup />
              {/* <div
                className='dashboard-header__user'
                style={{
                  background: `center/cover no-repeat url(${user.photoURL})`,
                }}
              ></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
