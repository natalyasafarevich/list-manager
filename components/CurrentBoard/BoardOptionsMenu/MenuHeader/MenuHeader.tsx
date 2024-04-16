import {MenuSectionProps} from '@/types/component-props';
import React, {FC} from 'react';

interface MenuHeaderProps extends MenuSectionProps {
  openStates: boolean[];
  closeMenu: (value: boolean) => void;
  setIsAboutBoardOpen: (value: boolean) => void;
  setIsOpenArchives: (value: boolean) => void;
  title: string;
}

const MenuHeader: FC<MenuHeaderProps> = ({
  openStates,
  title,
  setTitle,
  closeMenu,
  setIsAboutBoardOpen,
  setIsOpenArchives,
  setIsOpen,
}) => {
  const shouldShowBackButton = openStates.some((state) => state);

  const handleBackButtonClick = () => {
    setTitle('Menu');
    setIsAboutBoardOpen(false);
    setIsOpenArchives(false);
    setIsOpen(false);
  };

  return (
    <div className='additional-menu__headline'>
      {shouldShowBackButton && (
        <button
          className='additional-menu__button button-back'
          onClick={handleBackButtonClick}
        ></button>
      )}
      <p className='additional-menu__title'>{title}</p>
      <button
        className='additional-menu__button button-close'
        onClick={() => closeMenu(false)}
      ></button>
    </div>
  );
};
export default MenuHeader;
