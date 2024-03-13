import {FC} from 'react';
type ColumnProps = {
  name: string;
};
const Column: FC<ColumnProps> = ({name}) => {
  return (
    <div className='m-2 border rounded p-3 bg-light text-dark '>
      <div className='d-flex w-100 justify-content-between'>
        <b>{name}</b>
        <button>set</button>
      </div>
    </div>
  );
};

export default Column;
