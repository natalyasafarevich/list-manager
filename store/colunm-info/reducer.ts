import {ActionsType, COLUMN, CURRENT_COLUMN} from './actions';

interface ColumnState {
  current_column: any; // Типизируйте это как вам удобно
  data: any; // Типизируйте это как вам удобно
}

const initialState: ColumnState = {
  current_column: {},
  data: {},
};

export const ColumnReducer = (
  state: ColumnState = initialState,
  action: ActionsType,
): ColumnState => {
  switch (action.type) {
    case COLUMN: {
      return {...state, data: action.payload};
    }
    case CURRENT_COLUMN: {
      return {...state, current_column: action.payload};
    }
    default:
      return state;
  }
};
