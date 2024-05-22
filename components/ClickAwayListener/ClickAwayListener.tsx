import {ClickAwayListener as ClickAway} from '@mui/base/ClickAwayListener';

import {FC, ReactNode} from 'react';

interface ClickAwayListenerProps {
  children: ReactNode;
  setIsOpen: (value: boolean) => void;
}

const ClickAwayListener: FC<ClickAwayListenerProps> = ({children, setIsOpen}) => {
  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAway mouseEvent='onMouseDown' touchEvent='onTouchStart' onClickAway={handleClickAway}>
      <div>{children}</div>
    </ClickAway>
  );
};
export default ClickAwayListener;
