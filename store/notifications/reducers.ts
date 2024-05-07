import {ActionsType, IS_NOTIFICATIONS_OPEN, NOTIFICATIONS} from './actions';

interface initialStateProps {
  notifications: any;
  isOpen: boolean;
}

const initialState: initialStateProps = {
  notifications: [],
  isOpen: false,
};
export const NotificationsReducer = (
  state = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case IS_NOTIFICATIONS_OPEN: {
      return {
        ...state,
        isOpen: action.payload,
      };
    }
    default:
      return state;
  }
};
