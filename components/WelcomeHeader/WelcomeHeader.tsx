import Link from 'next/link';
import {FC} from 'react';
interface WelcomeHeaderProps {
  name: string;
  subTitle: string;
  text: string;
  link: string;
}
const WelcomeHeader: FC<WelcomeHeaderProps> = ({
  name,
  subTitle,
  text,
  link,
}) => {
  return (
    <div className='register__row flex'>
      <div className=''>
        <p className='register__title'>Welcome to Trello</p>
        <p className='register__subtitle'>{name}</p>
      </div>
      <p className='register__text'>
        {subTitle} <Link href={`/${link}`}>{text}</Link>
      </p>
    </div>
  );
};

export default WelcomeHeader;
