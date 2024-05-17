import {FC} from 'react';
import './Footer.scss';
import Link from 'next/link';
import BlueGradientButton from '../Buttons/BlueGradientButton/BlueGradientButton';

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__row flex container'>
          <div className='footer__box'>
            <Link href={'/'} className='footer__logo '></Link>
          </div>
          <div className='footer__box'>
            <ul className='footer__list'>
              <li>
                <Link href={'/about-project'} className='footer__link'>
                  About project
                </Link>
              </li>
              <li>
                <Link href={'/'} className='footer__link'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href={'/'} className='footer__link'>
                  GitHub
                </Link>
              </li>
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
