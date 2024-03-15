import {ActionsType, IS_COLUMN_SETTING_OPEN} from './actions';
// export type PayloadProps = {
//   isOpen: boolean;
// };
interface initialStateProps {
  isOpen: boolean;
}

const initialState: initialStateProps = {
  isOpen: false,
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

    default:
      return state;
  }
};
