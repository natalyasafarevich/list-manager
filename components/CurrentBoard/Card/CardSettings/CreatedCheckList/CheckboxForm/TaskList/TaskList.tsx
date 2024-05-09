import {CheckboxItemProps} from '@/types/interfaces';
import React from 'react';
import CheckboxItem from '../../CheckboxItem/CheckboxItem';

interface TaskListProps {
  tasks: {[key: string]: CheckboxItemProps};
  id: string;
  isHideChecked: boolean;
}

const TaskList: React.FC<TaskListProps> = ({tasks, id, isHideChecked}) => {
  return (
    <div className='checkbox-form__items'>
      {Object.keys(tasks)?.map((checkbox: any, i: any) => {
        if (isHideChecked && tasks[checkbox].isChecked) {
          return;
        }
        return (
          <div className='checkbox-form__item' key={i}>
            <CheckboxItem listId={id} item={tasks[checkbox]} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
