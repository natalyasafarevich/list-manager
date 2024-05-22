import {MessagesProps} from '@/providers/MessageStatusTracking';
import {ActionsType, INBOX, MERGED_MESSAGES} from './actions';

interface initialStateProps {
  inbox: MessagesProps;
  mergedMessages: any;
}

const initialState: initialStateProps = {
  inbox: {} as MessagesProps,
  mergedMessages: {},
};
export const InboxReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case INBOX: {
      return {
        ...state,
        inbox: action.payload,
      };
    }
    case MERGED_MESSAGES: {
      return {
        ...state,
        mergedMessages: action.payload,
      };
    }

    default:
      return state;
  }
};
