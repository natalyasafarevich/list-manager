import {ActionsType, CONTACTS} from './actions';

interface initialStateProps {
  links: {[key: string]: string};
}

const initialState: initialStateProps = {
  links: {},
};
export const ContactsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case CONTACTS: {
      return {
        ...state,
        links: action.payload,
      };
    }

    default:
      return state;
  }
};
