import {ActionsType, CURRENT_MEMBERS} from './actions';

interface initialStateProps {
  members: any;
}

const initialState: initialStateProps = {
  members: [],
};
export const MembersReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case CURRENT_MEMBERS: {
      return {
        ...state,
        members: action.payload,
      };
    }

    default:
      return state;
  }
};
