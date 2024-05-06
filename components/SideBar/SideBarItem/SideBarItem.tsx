// SideBarItem.tsx
import React, {FC} from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  onClick :(e:any)=>void
  children: React.ReactNode;
}

const SideBarItem: FC<Props> = ({href, children,onClick}) => {
  return (
    <li className='side-bar__item'>
      <Link href={href} className='side-bar__link' onClick={onClick}>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default SideBarItem;
