import {FC} from 'react';
import {v4 as createId} from 'uuid';
interface CheckboxItemProps {
  // id:
}

const CheckboxItem: FC = () => {
  return (
    <div>
      <input id='1' type='checkbox' />
      <label className='m-1' htmlFor={'1'}>
        a new task
      </label>
    </div>
  );
};

export default CheckboxItem;
