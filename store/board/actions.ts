import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const BOARDS = 'board/BOARDS';
export const CURRENT_BOARDS = 'board/CURRENT_BOARDS';

export type PayloadProps = {
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
};
export type DataBoardProp = {
  type: typeof BOARDS;
  payload: Array<PayloadProps>;
};
export type CurrentBoardProp = {
  type: typeof CURRENT_BOARDS;
  payload: any;
};

export type ActionsType = DataBoardProp | CurrentBoardProp;

export const getBoards = (data: any) => {
  return {
    type: BOARDS,
    payload: data,
  };
};

export const getBoardCurrent = (data: any) => {
  return {
    type: CURRENT_BOARDS,
    payload: data,
  };
};
