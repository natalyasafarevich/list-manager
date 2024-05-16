import {FC} from 'react';
import './Preview.scss';

const Preview: FC = () => {
  return (
    <div className='preview'>
      <div className='preview__container'></div>
      <div className='preview__row'>
        <div className='preview__title'>Transform Your Daily Tasks into Art </div>
        <div className='preview__img'></div>
      </div>
    </div>
  );
};
export default Preview;
