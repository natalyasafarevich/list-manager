import {IdTokenResult, User, UserInfo} from 'firebase/auth';
import {
  ActionsType,
  DATA_USER,
  DATA_USER_FOR_FIREBASE,
  RESET_DATA_USER,
  UPDATE_LINK,
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
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: '',
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

    default:
      return state;
  }
};
