import {FC, ReactNode, useEffect, useState} from 'react';
import './ExpandableContent.scss';

interface ExpandableContent {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setTitle: (value: string) => void;
}

const ExpandableContent: FC<ExpandableContent> = ({
  children,
  title,
  isOpen,
  setIsOpen,
  setTitle,
}) => {
  return (
    <>
      {!isOpen && (
        <div className='expandable-content'>
          <p
            className='expandable-content__title underline'
            onClick={() => {
              setTitle(title);
              setIsOpen(!isOpen);
            }}
          >
            {title}
          </p>
        </div>
      )}
      {isOpen && <div className='expandable-content__box'>{children}</div>}
    </>
  );
};

export default ExpandableContent;
