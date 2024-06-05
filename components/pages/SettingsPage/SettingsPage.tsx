'use client';
import {FC} from 'react';
import './SettingsPage.scss';
import useResponsive from '@/hooks/useResponsive';

import Link from 'next/link';
const links = [
  {url: '/settings/profile', name: 'General settings'},
  {url: '/settings/contacts', name: 'Contacts'},
  {url: '/settings/security', name: 'Security'},
  {url: '/settings/delete-account', name: 'Delete account'},
];
const SettingsPage: FC = () => {
  const {isMobile} = useResponsive();
  if (isMobile) {
    return (
      <section className='settings-page'>
        <div className='settings-page__container'>
          <p className='settings-page__title'>Account</p>

          <nav className='settings-page__nav'>
            <ul className='settings-page__list'>
              {links.map((label, i) => (
                <li key={i} className='settings-page__item'>
                  <Link className='settings-page__link ' href={label.url}>
                    {label.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    );
  }
};

export default SettingsPage;
