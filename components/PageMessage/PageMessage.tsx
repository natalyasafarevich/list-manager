import Link from 'next/link';
import {FC} from 'react';
import './PageMessage.scss';

interface PageMessageProps {
  text: string;
  link: string;
}

const PageMessage: FC<PageMessageProps> = ({text, link}) => {
  return (
    <div className='page-message'>
      <div className='page-message__container'>
        <div className='page-message__row'>
          <div className='page-message__box'>
            <p className='page-message__title'>
              OOOPS..
              <span>{text}</span>
            </p>
            <button className='button-border page-message__button'>
              <Link href={link}>Back To Home</Link>
            </button>
          </div>
          <div className='page-message__img'></div>
        </div>
      </div>
    </div>
  );
};

export default PageMessage;
