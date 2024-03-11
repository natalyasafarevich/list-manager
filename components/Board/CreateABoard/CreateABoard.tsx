import {FC} from 'react';

const CreateABoard: FC = () => {
  return (
    <div className='d-block'>
      <button className='d-block btn btn-outline-primary'>создать доску</button>
      <button className='d-block btn btn-outline-dark'>начнни с шаблона</button>
      <button type='button' className='d-block btn btn-outline-success'>
        создай рабочее пространство
      </button>
    </div>
  );
};

export default CreateABoard;
