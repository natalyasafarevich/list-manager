import {BoardProps} from '@/types/interfaces';
import {ActionsType, BOARDS, CURRENT_BOARDS} from './actions';

type InitialStateType = {
  boards: any;
  index: number;
  currentBoards: BoardProps;
};

const initialState: InitialStateType = {
  boards: {},
  currentBoards: {currentBg: '', id: '', name: '', lists: [], type: ''},
  index: 0,
};

export const DataBoardReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case BOARDS: {
      return {...state, boards: action.payload};
    }

    case CURRENT_BOARDS: {
      return {...state, currentBoards: action.payload, index: action.index};
    }

    default:
      return state;
  }
};
