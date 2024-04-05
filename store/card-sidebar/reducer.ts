import {ActionsType, IS_ARCHIVED, MARKERS, PayloadProps} from './actions';

interface initialStateProps {
  markers: Array<string>;
  isCardArchived: boolean;
}

const initialState: initialStateProps = {
  markers: [],
  isCardArchived: false,
};

export const MarkersReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case MARKERS: {
      const clone = structuredClone(state);
      clone.markers = action.payload;
      return clone;
    }
    case IS_ARCHIVED: {
      const clone = structuredClone(state);
      clone.isCardArchived = action.payload;
      return clone;
    }
    default:
      return state;
  }
};
