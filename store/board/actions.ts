import {BoardProps} from '@/types/interfaces';
import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const BOARDS = 'board/BOARDS';
export const CURRENT_BOARDS = 'board/CURRENT_BOARDS';

export type PayloadProps = {
  isCloseBoard: any;
  lists: any;
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
};
export type DataBoardProp = {
  type: typeof BOARDS;
  payload: Array<BoardProps>;
};
export type CurrentBoardProp = {
  type: typeof CURRENT_BOARDS;
  payload: BoardProps;
  index: number;
};

export type ActionsType = DataBoardProp | CurrentBoardProp;

export const getBoards = (data: Array<BoardProps>) => {
  return {
    type: BOARDS,
    payload: data,
  };
};

export const getBoardCurrent = (data: BoardProps, index: number) => {
  return {
    type: CURRENT_BOARDS,
    payload: data,
    index: index,
  };
};
