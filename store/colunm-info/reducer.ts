import {ColumnCardsProps} from '@/types/interfaces';
import {ActionsType, COLUMN, CURRENT_COLUMN} from './actions';

interface ColumnState {
  current_column: any; // Типизируйте это как вам удобно
  data: {id: string; cards: Array<ColumnCardsProps>}; // Типизируйте это как вам удобно
}

const initialState: ColumnState = {
  current_column: {},
  data: {
    id: '',
    cards: [],
  },
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
