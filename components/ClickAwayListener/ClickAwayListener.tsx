import {ClickAwayListener as ClickAway} from '@mui/base/ClickAwayListener';

import {FC, ReactNode} from 'react';

interface ClickAwayListenerProps {
  children: ReactNode;
  setIsOpen: (value: boolean) => void;
}

const ClickAwayListener: FC<ClickAwayListenerProps> = ({children, setIsOpen}) => {
  const handleClickAway = () => {
    setIsOpen(false);
    console.log(',jdsbldssnl');
  };

  return (
    // <div>
    <ClickAway mouseEvent='onMouseDown' touchEvent='onTouchStart' onClickAway={handleClickAway}>
      <div>{children}</div>
    </ClickAway>
    // </div>
  );
};
export default ClickAwayListener;
