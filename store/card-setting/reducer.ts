import {CommentProps} from '@/components/CurrentBoard/Card/CardSettings/CardSettings';
import {
  ActionsType,
  COMMENTS,
  IS_CARD_SETTING_OPEN,
  IS_CARD_UPDATE,
  IS_COVER,
  IS_CREATE_CARD,
  IS_DESCRIPTION_ADDED,
} from './actions';

interface initialStateProps {
  isOpen: boolean;
  comments: Array<CommentProps>;
  isCardCreate: boolean;
  isDescriptionAdded: boolean;
  isCover: boolean;
  isUpdate: boolean;
}

const initialState: initialStateProps = {
  isOpen: false,
  comments: [],
  isCardCreate: false,
  isDescriptionAdded: false,
  isCover: false,
  isUpdate: false,
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
    case IS_CREATE_CARD: {
      const clone = structuredClone(state);
      clone.isCardCreate = action.payload.isCardCreate;
      return clone;
    }
    case IS_DESCRIPTION_ADDED: {
      const clone = structuredClone(state);
      clone.isDescriptionAdded = action.payload;
      return clone;
    }
    case IS_COVER: {
      const clone = structuredClone(state);
      clone.isCover = action.payload;
      return clone;
    }
    case IS_CARD_UPDATE: {
      const clone = structuredClone(state);
      clone.isUpdate = action.payload;
      return clone;
    }

    default:
      return state;
  }
};
