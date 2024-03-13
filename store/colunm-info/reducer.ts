import {ActionsType, COLUMN} from './actions';

const initialState: any = {};

export const ColumnReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case COLUMN: {
      return {...action.payload};
    }

    default:
      return state;
  }
};
