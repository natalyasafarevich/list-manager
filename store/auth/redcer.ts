import {ActionsType, GOOGLE_PROVIDER} from './actions';

type InitialStateType = {
  isGoogleProvider: boolean;
};

const initialState: InitialStateType = {
  isGoogleProvider: false,
};

export const AuthReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case GOOGLE_PROVIDER: {
      return {...state, isGoogleProvider: action.payload};
    }

    default:
      return state;
  }
};
