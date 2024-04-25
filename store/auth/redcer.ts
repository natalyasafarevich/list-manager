import {BasicUserInfo} from '@/components/ProfileCompletionForm/Step1Form/Step1Form';
import {ActionsType, BASIC_USER_INFO, GOOGLE_PROVIDER} from './actions';

type InitialStateType = {
  isGoogleProvider: boolean;
  first_step_data: BasicUserInfo;
};

const initialState: InitialStateType = {
  isGoogleProvider: false,
  first_step_data: {} as BasicUserInfo,
};

export const AuthReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case GOOGLE_PROVIDER: {
      return {...state, isGoogleProvider: action.payload};
    }
    case BASIC_USER_INFO: {
      return {...state, first_step_data: action.payload};
    }

    default:
      return state;
  }
};
