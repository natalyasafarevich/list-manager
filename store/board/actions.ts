import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const BOARDS = 'board/BOARDS';

export type DataBoardProp = {
  type: typeof BOARDS;
  payload: any;
};

export type ActionsType = DataBoardProp;

export const getBoards = (data: any) => {
  return {
    type: BOARDS,
    payload: data,
  };
};
