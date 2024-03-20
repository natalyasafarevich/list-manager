import {ActionsType, MARKERS, PayloadProps} from './actions';

interface initialStateProps {
  markers: Array<string>;
}

const initialState: initialStateProps = {
  markers: [],
};

export const MarkersReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case MARKERS: {
      const clone = structuredClone(state);
      clone.markers = action.payload;
      return clone;
    }

    default:
      return state;
  }
};
