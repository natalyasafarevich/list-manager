import {FC} from 'react';
import CreateABoard from './CreateABoard/CreateABoard';

const Board: FC = () => {
  return (
    <div className='d-block'>
      <button className='d-block btn btn-outline-primary'>создать доску</button>
      <CreateABoard />
      {/* <button className='d-block btn btn-outline-dark'>начнни с шаблона</button> */}
      {/* <button type='button' className='d-block btn btn-outline-success'>
        создай рабочее пространство
      </button> */}
    </div>
  );
};

export default Board;
