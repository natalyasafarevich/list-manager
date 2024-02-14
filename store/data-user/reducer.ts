import {IdTokenResult, User, UserInfo} from 'firebase/auth';
import {ActionsType, DATA_USER} from './actions';

const initialState = {
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: '',
};
export const DataUserReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case DATA_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
