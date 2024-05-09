// SubMenu.tsx
import React, {FC} from 'react';

interface Props {
  children: React.ReactNode;
}

const SubMenu: FC<Props> = ({children}) => {
  return <ul className='side-bar__nested'>{children}</ul>;
};

export default SubMenu;
