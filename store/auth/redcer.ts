import {BasicUserInfo} from '@/components/ProfileCompletionForm/Step1Form/Step1Form';
import {
  ADDITIONAL_USER_INFO,
  ActionsType,
  BASIC_USER_INFO,
  GOOGLE_PROVIDER,
  USERS_NICKNAMES,
} from './actions';
import {InputsProps} from '@/components/ProfileCompletionForm/Step2Form/Step2Form';

type InitialStateType = {
  isGoogleProvider: boolean;
  first_step_data: BasicUserInfo;
  second_step_data: InputsProps;
  user_names: string[];
};

const initialState: InitialStateType = {
  isGoogleProvider: false,
  first_step_data: {} as BasicUserInfo,
  second_step_data: {} as InputsProps,
  user_names: [],
};

export const AuthReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case GOOGLE_PROVIDER: {
      return {...state, isGoogleProvider: action.payload};
    }
    case BASIC_USER_INFO: {
      return {...state, first_step_data: action.payload};
    }
    case ADDITIONAL_USER_INFO: {
      return {...state, second_step_data: action.payload};
    }
    case USERS_NICKNAMES: {
      return {...state, user_names: action.payload};
    }
    default:
      return state;
  }
};
