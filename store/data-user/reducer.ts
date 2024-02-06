import {IdTokenResult, User} from 'firebase/auth';
import {ActionsType, DATA_USER} from './actions';

const initialState = {data: {}};
export const DataUserReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case DATA_USER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
