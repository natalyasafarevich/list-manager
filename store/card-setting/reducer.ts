import {ActionsType, IS_CARD_SETTING_OPEN} from './actions';

interface initialStateProps {
  isOpen: boolean;
}

const initialState: initialStateProps = {
  isOpen: false,
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

    default:
      return state;
  }
};
