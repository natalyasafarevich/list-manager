// reducer.js
import {TOGGLE_MENU, ActionsType} from './actions';

const initialState = {
  isOpen: false,
};

const menuReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
