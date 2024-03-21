import {FC, ReactNode} from 'react';

interface MiniPopupProps {
  setIsOpen: (value: boolean) => void;
  title: string;
  children: ReactNode;
}
const MiniPopup: FC<MiniPopupProps> = ({setIsOpen, title, children}) => {
  return (
    <div>
      <div
        className='position-absolute p-2'
        style={{
          background: 'white',
          width: '200px',
          right: 0,
          top: 0,
          border: '1px solid black',
        }}
      >
        <div className='d-flex justify-content-between '>
          <span className='text-center'>{title}</span>
          <button onClick={() => setIsOpen(false)}>x</button>
        </div>
        <div className=''>{children}</div>
      </div>
    </div>
  );
};

export default MiniPopup;
