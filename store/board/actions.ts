import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const BOARDS = 'board/BOARDS';
export const CURRENT_BOARDS = 'board/CURRENT_BOARDS';

export type PayloadProps = {
  lists: any;
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
  index: number;
};

export type ActionsType = DataBoardProp | CurrentBoardProp;

export const getBoards = (data: Array<any>) => {
  return {
    type: BOARDS,
    payload: data,
  };
};

export const getBoardCurrent = (data: any, index: number) => {
  return {
    type: CURRENT_BOARDS,
    payload: data,
    index: index,
  };
};
