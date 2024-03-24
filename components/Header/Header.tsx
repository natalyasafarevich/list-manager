import Link from 'next/link';
import {FC} from 'react';
import SignOut from '../auth/SignOut/SignOut';

const Header: FC = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Navbar
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex  align-items-center  justify-content-between w-50'>
              <li className='nav-item'>
                <Link className='nav-link' href='/user'>
                  User
                </Link>
              </li>{' '}
              <li className='nav-item'>
                <Link className='nav-link' href='/registration'>
                  Registration
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/boards'>
                  Boards
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/log-in'>
                  Log in
                </Link>
              </li>
              <li>
                <SignOut></SignOut>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
