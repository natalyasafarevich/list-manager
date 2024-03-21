import {CheckListProps} from '@/types/interfaces';
import {ActionsType, CHECK_LISTS} from './actions';

interface initialStateProps {
  lists: Array<CheckListProps>;
}

const initialState: initialStateProps = {
  lists: [],
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

    default:
      return state;
  }
};
