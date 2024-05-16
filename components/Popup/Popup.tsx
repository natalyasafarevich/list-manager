import React, {FC, ReactNode} from 'react';
import './Popup.scss';
import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';

interface PopupProps {
  title: string;
  setIsClose: (value: boolean) => void;
  children: ReactNode;
}
const Popup: FC<PopupProps> = ({title, setIsClose, children}) => {
  return (
    <ClickAwayListener setIsOpen={(e) => setIsClose(e)}>
      <div className='popup'>
        <div className='popup__container'>
          <div className='popup__box'>
            <p className='popup__title'>{title}</p>
            <button className='button-close' onClick={(e) => setIsClose(false)}></button>
          </div>
          <div className='popup__content'>{children}</div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Popup;
