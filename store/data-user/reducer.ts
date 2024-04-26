import {IdTokenResult, User, UserInfo} from 'firebase/auth';
import {
  ActionsType,
  DATA_USER,
  DATA_USER_FOR_FIREBASE,
  DATA_USER_FROM_FIREBASE,
  RESET_DATA_USER,
  UPDATE_LINK,
  UPDATE_PHOTO,
  USER_STATUS,
} from './actions';

interface initialStateProps {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

const initialState = {
  main_info: {},
  current_info: {},
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: '',
  user_status: '',
  dataFB: {
    uid: '',
    boardIndex: 0,
    cardIndex: 0,
  },
  dataLink: {
    boardIndex: null,
    listIndex: null,
    cardIndex: null,
  },
  user_data: {},
};
export const DataUserReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case DATA_USER: {
      return {
        ...state,
        current_info: action.payload,
      };
    }
    case RESET_DATA_USER: {
      return {
        ...state,
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: '',
        uid: '',
      };
    }
    case DATA_USER_FOR_FIREBASE: {
      return {
        ...state,
        dataFB: action.payload,
      };
    }
    case UPDATE_LINK: {
      return {
        ...state,
        dataLink: action.payload,
      };
    }
    case UPDATE_PHOTO: {
      return {
        ...state,
        photoURL: action.payload,
      };
    }
    case USER_STATUS: {
      return {
        ...state,
        user_status: action.payload,
      };
    }
    case DATA_USER_FROM_FIREBASE: {
      return {
        ...state,
        user_data: action.payload,
      };
    }
    default:
      return state;
  }
};
