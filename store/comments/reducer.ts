import {ActionsType, COMMENT_OWNER} from './actions';

interface initialStateProps {
  owner: string;
}

const initialState: initialStateProps = {
  owner: '',
};
export const CommentsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case COMMENT_OWNER: {
      return {
        ...state,
        owner: action.payload,
      };
    }

    default:
      return state;
  }
};
