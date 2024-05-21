import {MessagesProps} from '@/providers/MessageStatusTracking';
import {ActionsType, INBOX} from './actions';

interface initialStateProps {
  inbox: MessagesProps;
}

const initialState: initialStateProps = {
  inbox: {} as MessagesProps,
};
export const InboxReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case INBOX: {
      return {
        ...state,
        inbox: action.payload,
      };
    }

    default:
      return state;
  }
};
