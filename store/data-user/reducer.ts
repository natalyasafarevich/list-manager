import {IdTokenResult, User, UserInfo} from 'firebase/auth';
import {
  ADDITIONAL_INFO,
  ActionsType,
  DATA_USER,
  DATA_USER_FOR_FIREBASE,
  DATA_USER_FROM_FIREBASE,
  RESET_DATA_USER,
  UPDATE_LINK,
  USERNAMES,
  USER_STATUS,
  USER_UPDATED,
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
  additional_info: null,
  displayName: null,
  email: null,
  phoneNumber: null,
  isUpdate: false,
  photoURL: '',
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
  usernames: {},
};
export const DataUserReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case DATA_USER: {
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        providerId: action.payload.providerId,
        uid: action.payload.uid,
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
    case USER_UPDATED: {
      return {
        ...state,
        isUpdate: action.payload,
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
    case ADDITIONAL_INFO: {
      return {
        ...state,
        additional_info: action.payload,
      };
    }
    case USERNAMES: {
      return {
        ...state,
        usernames: action.payload,
      };
    }
    default:
      return state;
  }
};
