import {ActionsType, BOARDS, CURRENT_BOARDS, PayloadProps} from './actions';

type InitialStateType = {
  boards: Array<PayloadProps>;
  index: number;
  currentBoards: {
    lists: Array<any>;
  }; // Замените 'any' на тип данных для поля currentBoards, если он не является массивом
};

const initialState: InitialStateType = {
  boards: [],
  currentBoards: {lists: []},
  index: 0,
};

export const DataBoardReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case BOARDS: {
      return {...state, boards: action.payload}; // Обновляем поле boards в состоянии
    }

    case CURRENT_BOARDS: {
      return {...state, currentBoards: action.payload, index: action.index}; // Обновляем поле currentBoards в состоянии
    }

    default:
      return state;
  }
};
