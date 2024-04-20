import {FC, ReactNode} from 'react';
import './MiniPopup.scss';
interface MiniPopupProps {
  setIsOpen: (value: boolean) => void;
  title: string;
  children: ReactNode;
}
const MiniPopup: FC<MiniPopupProps> = ({setIsOpen, title, children}) => {
  return (
    <div className='mini-popup'>
      <div className='mini-popup__container'>
        <div className='mini-popup__row flex '>
          <p className='mini-popup__title'>{title}</p>
          <button
            className='mini-popup__button button-close'
            onClick={() => setIsOpen(false)}
          ></button>
        </div>
        <div className='mini-popup__content'>{children}</div>
      </div>
    </div>
  );
};

export default MiniPopup;
