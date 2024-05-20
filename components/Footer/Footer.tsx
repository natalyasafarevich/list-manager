'use client';
import {FC} from 'react';
import './Footer.scss';
import Link from 'next/link';
import BlueGradientButton from '../Buttons/BlueGradientButton/BlueGradientButton';
import {links} from '@/variables/default';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const Footer: FC = () => {
  const {uid} = useSelector((state: RootState) => state.userdata);
  if (!uid)
    return (
      <footer className='footer'>
        <div className='footer__container'>
          <div className='footer__row flex container'>
            <div className='footer__box'>
              <Link href={'/'} className='footer__logo logo '>
                HiveMind
              </Link>
            </div>
            <div className='footer__box'>
              <ul className='footer__list'>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className='footer__link'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='footer__box'>
              <BlueGradientButton href={'/'} title=' Contact Us' className='footer__button button-light-blue' />
            </div>
          </div>
          <div className='footer__bottom'>© 2024 - All Rights Reserved</div>
        </div>
      </footer>
    );
};

export default Footer;
