// import {CheckListProps} from '@/types/interfaces';
import {
  ActionsType,
  CHECK_LISTS,
  CHECK_LIST_INDEX,
  CURRENT_TASKS,
  DELETE_LIST,
  IS_DELETE_LIST,
  IS_UPDATE_TASK,
} from './actions';

interface initialStateProps {
  lists: Array<any>;
  deleteList: Array<any>;
  index: any;
  isTaskUpdate: boolean;
  isDeleteList: boolean;
  current_tasks: {
    isCreate: boolean;
    data: Array<any>;
  };
}

const initialState: initialStateProps = {
  lists: [],
  deleteList: [],
  isDeleteList: false,
  isTaskUpdate: false,
  index: null,
  current_tasks: {
    isCreate: false,
    data: [],
  },
};

export const CheckListsReducer = (state = initialState, action: ActionsType) => {
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
    case IS_UPDATE_TASK: {
      const clone = structuredClone(state);
      clone.isTaskUpdate = action.payload;
      return clone;
    }
    case IS_DELETE_LIST: {
      const clone = structuredClone(state);
      clone.isDeleteList = action.payload;
      return clone;
    }
    case DELETE_LIST: {
      const clone = structuredClone(state);
      clone.deleteList = action.payload;
      return clone;
    }
    default:
      return state;
  }
};
