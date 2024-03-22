import {CheckListProps} from '@/types/interfaces';
import {
  ActionsType,
  CHECK_LISTS,
  CHECK_LIST_INDEX,
  CURRENT_TASKS,
} from './actions';
import {ListTasksProps} from '@/components/CurrentBoard/Card/CardSettings/CreatedCheckList/AddItemForm/AddItemForm';

interface initialStateProps {
  lists: Array<CheckListProps>;
  index: any;
  current_tasks: {
    isCreate: boolean;
    data: Array<ListTasksProps>;
  };
}

const initialState: initialStateProps = {
  lists: [],
  index: null,
  current_tasks: {
    isCreate: false,
    data: [],
  },
};

export const CheckListsReducer = (
  state = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case CHECK_LISTS: {
      const clone = structuredClone(state);
      clone.lists = action.payload;
      return clone;
    }
    case CHECK_LIST_INDEX: {
      const clone = structuredClone(state);
      clone.index = action.payload;
      return clone;
    }
    case CURRENT_TASKS: {
      const clone = structuredClone(state);
      clone.current_tasks.data = action.payload.data;
      clone.current_tasks.isCreate = action.payload.isCreate;
      return clone;
    }
    default:
      return state;
  }
};
