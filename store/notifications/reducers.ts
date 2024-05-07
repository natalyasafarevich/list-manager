import {ActionsType, NOTIFICATIONS} from './actions';

interface initialStateProps {
  notifications: any;
}

const initialState: initialStateProps = {
  notifications: [],
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

    default:
      return state;
  }
};
