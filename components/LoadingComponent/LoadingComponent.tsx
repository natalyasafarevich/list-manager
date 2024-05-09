import {FC} from 'react';
import './LoadingComponent.scss';

const LoadingComponent: FC = () => {
  return (
    <div className='loader'>
      <div className='loader__component'></div>
    </div>
  );
};

export default LoadingComponent;
