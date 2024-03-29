import {FC, ReactNode, useEffect, useState} from 'react';
import TextEditor from '../TextEditor/TextEditor';

interface ExpandableContent {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ExpandableContent: FC<ExpandableContent> = ({
  children,
  title,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {!isOpen && (
        <div className=''>
          <p onClick={() => setIsOpen(!isOpen)}>
            <b> {title}</b>
          </p>
        </div>
      )}
      {isOpen && <div>{children}</div>}
    </>
  );
};

export default ExpandableContent;
