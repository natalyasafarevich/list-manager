import {ActionsType, BOARDS, PayloadProps} from './actions';

const initialState: Array<PayloadProps> = [];

export const DataBoardReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case BOARDS: {
      return [...action.payload];
    }

    default:
      return state;
  }
};
