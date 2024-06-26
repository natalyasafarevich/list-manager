import {
  ActionsType,
  IS_COLUMN_SETTING_OPEN,
  IS_COPY_COLUMN,
  IS_CREATE_CARD,
  IS_ARCHIVE_COLUMN,
} from './actions';

interface initialStateProps {
  isOpen: boolean;
  isCreate: boolean;
  isCopy: boolean;
  isArchive: boolean;
}

const initialState: initialStateProps = {
  isOpen: false,
  isCreate: false,
  isCopy: false,
  isArchive: false,
};

export const ColumnSettingReducer = (
  state = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case IS_COLUMN_SETTING_OPEN: {
      const clone = structuredClone(state);
      clone.isOpen = action.payload.isOpen;
      return clone;
    }
    case IS_CREATE_CARD: {
      const clone = structuredClone(state);
      clone.isCreate = action.payload.isCreate;
      return clone;
    }
    case IS_COPY_COLUMN: {
      const clone = structuredClone(state);
      clone.isCopy = action.payload.isCopy;
      return clone;
    }
    case IS_ARCHIVE_COLUMN: {
      const clone = structuredClone(state);
      clone.isArchive = action.payload.isArchive;
      return clone;
    }

    default:
      return state;
  }
};
