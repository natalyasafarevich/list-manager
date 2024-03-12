import {ActionsType, BOARDS} from './actions';

const initialState: any = [];

export const DataBoardReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case BOARDS: {
      return [...action.payload];
    }

    default:
      return state;
  }
};
