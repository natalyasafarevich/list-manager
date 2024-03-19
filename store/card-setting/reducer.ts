import {CommentProps} from '@/components/CurrentBoard/Card/CardSettings/CardSettings';
import {ActionsType, COMMENTS, IS_CARD_SETTING_OPEN} from './actions';

interface initialStateProps {
  isOpen: boolean;
  comments: Array<CommentProps>;
}

const initialState: initialStateProps = {
  isOpen: false,
  comments: [],
};

export const CardSettingReducer = (
  state = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case IS_CARD_SETTING_OPEN: {
      const clone = structuredClone(state);
      clone.isOpen = action.payload.isOpen;
      return clone;
    }
    case COMMENTS: {
      const clone = structuredClone(state);
      clone.comments = action.payload;
      return clone;
    }

    default:
      return state;
  }
};
