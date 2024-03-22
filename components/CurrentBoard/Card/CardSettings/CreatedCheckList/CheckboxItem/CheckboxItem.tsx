import {FC} from 'react';
import {v4 as createId} from 'uuid';
interface CheckboxItemProps {
  item: {id: string; title: string};
}

const CheckboxItem: FC<CheckboxItemProps> = ({item}) => {
  return (
    <div>
      <input id={item.id} type='checkbox' />
      <label className='m-1' htmlFor={item.id}>
        {item.title}
      </label>
    </div>
  );
};

export default CheckboxItem;
